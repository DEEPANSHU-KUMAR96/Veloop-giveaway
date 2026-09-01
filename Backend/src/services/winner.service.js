import GiveawayWinner from '../models/GiveawayWinner.model.js';
import GiveawayParticipation from '../models/GiveawayParticipation.model.js';
import { getGiveawayById } from './giveaway.service.js';

// Mask user ID for privacy — "VE10025" becomes "VE****25"
const maskUserId = (userId) => {
    const str = userId.toString();
    if (str.length <= 4) return str;
    return str.slice(0, 2) + '****' + str.slice(-2);
};

// Select winners randomly for each prize
// Called by admin after giveaway ends
export const selectWinners = async (giveawayId) => {
    const giveaway = await getGiveawayById(giveawayId);

    if (!giveaway) throw new Error('GIVEAWAY_NOT_FOUND');
    if (giveaway.status !== 'ENDED') throw new Error('GIVEAWAY_NOT_ENDED');

    const winnersCreated = [];

    for (const prize of giveaway.prizes) {
        // Get all participants for this prize
        const participants = await GiveawayParticipation.find({
            giveawayId,
            prizeId: prize.id,
            status: 'ACTIVE'
        });

        if (participants.length === 0) continue;

        // Shuffle and pick required number of winners
        const shuffled = participants.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, prize.winnerCount);

        for (const participant of selected) {
            // Create winner record
            const winner = await GiveawayWinner.create({
                giveawayId,
                userId: participant.userId,
                prizeId: prize.id,
                prizeName: prize.name,
                prizeType: prize.type,
                displayName: maskUserId(participant.userId),
            });

            // Update participation status
            await GiveawayParticipation.findByIdAndUpdate(
                participant._id,
                { status: 'WINNER' }
            );

            winnersCreated.push(winner);
        }

        // Mark non-winners
        await GiveawayParticipation.updateMany(
            { giveawayId, prizeId: prize.id, status: 'ACTIVE' },
            { status: 'NON_WINNER' }
        );
    }

    return winnersCreated;
};

// Get all winners for a giveaway
export const getWinnersByGiveaway = async (giveawayId) => {
    return await GiveawayWinner.find({ giveawayId })
        .select('-userId') // never expose real userId publicly
        .sort({ createdAt: -1 });
};

// Check if logged in user is a winner
export const checkIfUserIsWinner = async (userId, giveawayId) => {
    const winner = await GiveawayWinner.findOne({
         userId,
          giveawayId 
        });
    return {
        isWinner: !!winner,
        winner: winner || null,
    };
};