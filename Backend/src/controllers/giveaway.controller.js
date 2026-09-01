import {
    getCurrentGiveaway,
    getGiveawayBySlug,
    getPreviousGiveaways,
    syncGiveawayStatus,
} from '../services/giveaway.service.js';
import { checkIfUserIsWinner } from '../services/winner.service.js';
import { getMyStatus } from '../services/participation.service.js';
import { hasSufficientBalance } from '../services/balance.service.js';

// GET /api/giveaways/current
export const getCurrentGiveawayHandler = async (req, res, next) => {
    try {
        const giveaway = await getCurrentGiveaway();

        if (!giveaway) {
            return res.status(404).json({
                success: false,
                message: 'No active or upcoming giveaway found'
            });
        }

        res.status(200).json({
            success: true,
            data: giveaway
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/giveaways/:slug
export const getGiveawayBySlugHandler = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const giveaway = await getGiveawayBySlug(slug);

        if (!giveaway) {
            return res.status(404).json({
                success: false,
                message: 'Giveaway not found'
            });
        }

        // Sync status based on server time
        await syncGiveawayStatus(giveaway);

        res.status(200).json({
            success: true,
            data: giveaway
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/giveaways/previous
export const getPreviousGiveawaysHandler = async (req, res, next) => {
    try {
        const giveaways = await getPreviousGiveaways();

        res.status(200).json({
            success: true,
            count: giveaways.length,
            data: giveaways
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/giveaways/:id/my-status
// Returns everything the frontend needs to show the right UI state
export const getMyGiveawayStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const giveaway = await getCurrentGiveaway();
        if (!giveaway) {
            return res.status(404).json({
                success: false,
                message: 'Giveaway not found'
            });
        }

        // Check participation
        const { hasJoined, participation } = await getMyStatus(userId, id);

        // Check if winner
        const { isWinner, winner } = await checkIfUserIsWinner(userId, id);

        // Check balance for each prize
        const balanceInfo = {};
        for (const prize of giveaway.prizes) {
            const balance = await hasSufficientBalance(
                userId,
                prize.currency,
                prize.entryFee
            );
            balanceInfo[prize.id] = balance;
        }

        res.status(200).json({
            success: true,
            data: {
                giveawayStatus: giveaway.status,
                hasJoined,
                participation,
                isWinner,
                winner,
                balanceInfo,
            }
        });

    } catch (error) {
        next(error);
    }
};