import express from 'express';
import {
    getGiveawayWinnersHandler,
    getPreviousWinnersHandler,
    checkMyWinnerStatusHandler,
    selectWinnersHandler,
} from '../controllers/winner.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import { param } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/previous/winners', getPreviousWinnersHandler);
router.get(
    '/:id/winners',
    param('id').isMongoId().withMessage('Invalid giveawayId'),
    validationMiddleware,
    getGiveawayWinnersHandler
);

// Protected routes
router.get(
    '/:id/my-winner-status',
    authMiddleware,
    param('id').isMongoId().withMessage('Invalid giveawayId'),
    validationMiddleware,
    checkMyWinnerStatusHandler
);

// Admin only route — select winners after giveaway ends
router.post(
    '/:id/select-winners',
    authMiddleware,
    param('id').isMongoId().withMessage('Invalid giveawayId'),
    validationMiddleware,
    selectWinnersHandler
);

export default router;