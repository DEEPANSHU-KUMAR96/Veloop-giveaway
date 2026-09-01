import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import GiveawayParticipation from '../models/GiveawayParticipation.model.js';
import GiveawayEntryTransaction from '../models/GiveawayEntryTransaction.model.js';
import AuditLog from '../models/AuditLog.model.js';
import { getGiveawayById, syncGiveawayStatus } from './giveaway.service.js';
import { hasSufficientBalance, deductBalance } from './balance.service.js';

export const joinGiveaway = async ({
    userId,
    giveawayId,
    prizeId,
    deviceHash,
    ipAddress,
    fraudData
}) => {

    // Step 1 — Get giveaway and sync its status from server time
    const giveaway = await getGiveawayById(giveawayId);
    if (!giveaway) throw new Error('GIVEAWAY_NOT_FOUND');

    await syncGiveawayStatus(giveaway);

    if (giveaway.status !== 'ACTIVE') {
        throw new Error('GIVEAWAY_NOT_ACTIVE');
    }

    // Step 2 — Find the prize inside the giveaway
    const prize = giveaway.prizes.find(p => p.id === prizeId);
    if (!prize) throw new Error('PRIZE_NOT_FOUND');

    // Step 3 — Check if user already joined this giveaway
    const alreadyJoined = await GiveawayParticipation.findOne({
        userId,
        giveawayId
    });

    if (alreadyJoined) throw new Error('ALREADY_PARTICIPATED');

    // Step 4 — Check user balance using backend prize config
    // We NEVER trust the amount sent from frontend
    const { hasSufficient, currentBalance, shortfall } =
        await hasSufficientBalance(userId, prize.currency, prize.entryFee);

    if (!hasSufficient) {
        throw new Error(`INSUFFICIENT_BALANCE:${prize.currency}:${shortfall}`);
    }

    // Step 5 — Start MongoDB transaction
    // Participation + balance deduction + transaction record
    // ALL succeed or ALL fail together
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Deduct balance
        const { balanceBefore, balanceAfter } = await deductBalance(
            userId,
            prize.currency,
            prize.entryFee,
            session
        );

        // Create participation record
        const participation = await GiveawayParticipation.create([{
            userId,
            giveawayId,
            prizeId,
            deviceHash,
            ipAddress,
            status: 'ACTIVE',
        }], { session });

        // Record the transaction
        const transactionId = uuidv4();
        await GiveawayEntryTransaction.create([{
            transactionId,
            userId,
            giveawayId,
            prizeId,
            currency: prize.currency,
            amount: prize.entryFee,
            balanceBefore,
            balanceAfter,
            status: 'SUCCESS',
            type: 'GIVEAWAY_ENTRY',
        }], { session });

        // Increment participant count on giveaway
        await mongoose.model('Giveaway').findByIdAndUpdate(
            giveawayId,
            { $inc: { totalParticipants: 1 } },
            { session }
        );

        // Audit log
        await AuditLog.create([{
            userId,
            action: 'JOIN_GIVEAWAY',
            entity: 'Giveaway',
            entityId: giveawayId,
            details: { prizeId, currency: prize.currency, amount: prize.entryFee },
            ipAddress,
        }], { session });

        // Commit everything
        await session.commitTransaction();
        session.endSession();

        return {
            success: true,
            participation: participation[0],
            transactionId,
            balanceAfter,
            currency: prize.currency,
        };

    } catch (error) {
        // If anything fails, roll back everything
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Check if a user has already joined a giveaway
export const getMyStatus = async (userId, giveawayId) => {
    const participation = await GiveawayParticipation.findOne({
        userId,
        giveawayId
    });

    return {
        hasJoined: !!participation,
        participation: participation || null,
    };
};