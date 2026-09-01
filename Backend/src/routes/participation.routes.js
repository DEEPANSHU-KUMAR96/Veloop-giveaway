import express from 'express';
import {
    joinGiveawayHandler,
    getMyParticipationHandler,
} from '../controllers/participation.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { joinLimiter } from '../middleware/rateLimit.middleware.js';
import fraudMiddleware from '../middleware/fraud.middleware.js';

const router = express.Router();

// POST /api/giveaways/:giveawayId/join
// Protected + rate limited + fraud checked
router.post(
    '/:giveawayId/join',
    authMiddleware,       // must be logged in
    joinLimiter,          // max 3 attempts per minute
    fraudMiddleware,      // fraud risk check
    joinGiveawayHandler
);

// GET /api/giveaways/:giveawayId/my-participation
router.get(
    '/:giveawayId/my-participation',
    authMiddleware,
    getMyParticipationHandler
);

export default router;