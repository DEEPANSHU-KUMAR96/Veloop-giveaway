import {
    getWinnersByGiveaway,
    checkIfUserIsWinner,
    selectWinners,
} from '../services/winner.service.js';
import GiveawayWinner from '../models/GiveawayWinner.model.js';

// GET /api/giveaways/:id/winners
export const getGiveawayWinnersHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const winners = await getWinnersByGiveaway(id);

        res.status(200).json({
            success: true,
            count: winners.length,
            data: winners
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/giveaways/previous/winners
// All winners from all previous giveaways
export const getPreviousWinnersHandler = async (req, res, next) => {
    try {
        const winners = await GiveawayWinner.find()
            .select('-userId')         // never expose real userId
            .sort({ createdAt: -1 })
            .limit(50);                // limit for performance

        res.status(200).json({
            success: true,
            count: winners.length,
            data: winners
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/giveaways/:id/my-winner-status
// Check if the logged in user won this giveaway
export const checkMyWinnerStatusHandler = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const { isWinner, winner } = await checkIfUserIsWinner(userId, id);

        res.status(200).json({
            success: true,
            data: { isWinner, winner }
        });

    } catch (error) {
        next(error);
    }
};

// POST /api/admin/giveaways/:id/select-winners
// Admin only — trigger winner selection after giveaway ends
export const selectWinnersHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const winners = await selectWinners(id);

        res.status(200).json({
            success: true,
            message: `${winners.length} winners selected successfully`,
            data: winners
        });

    } catch (error) {
        const knownErrors = {
            GIVEAWAY_NOT_FOUND: { status: 404, message: 'Giveaway not found' },
            GIVEAWAY_NOT_ENDED: { status: 400, message: 'Giveaway has not ended yet' },
        };

        const known = knownErrors[error.message];
        if (known) {
            return res.status(known.status).json({
                success: false,
                message: known.message
            });
        }

        next(error);
    }
};