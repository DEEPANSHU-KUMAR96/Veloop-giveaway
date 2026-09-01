import express from 'express';
import {
    getCurrentGiveawayHandler,
    getGiveawayBySlugHandler,
    getPreviousGiveawaysHandler,
    getMyGiveawayStatus,
} from '../controllers/giveaway.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes — no login needed
router.get('/current', getCurrentGiveawayHandler);
router.get('/previous', getPreviousGiveawaysHandler);
router.get('/:slug', getGiveawayBySlugHandler);

// Protected routes — login required
router.get('/:id/my-status', authMiddleware, getMyGiveawayStatus);

export default router;