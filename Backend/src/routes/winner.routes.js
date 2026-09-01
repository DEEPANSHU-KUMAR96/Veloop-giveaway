import express from 'express';
import {
    getGiveawayWinnersHandler,
    getPreviousWinnersHandler,
    checkMyWinnerStatusHandler,
    selectWinnersHandler,
} from '../controllers/winner.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/previous/winners', getPreviousWinnersHandler);
router.get('/:id/winners', getGiveawayWinnersHandler);

// Protected routes
router.get('/:id/my-winner-status', authMiddleware, checkMyWinnerStatusHandler);

// Admin only route — select winners after giveaway ends
router.post('/:id/select-winners', authMiddleware, selectWinnersHandler);

export default router;