import express from 'express';
import {
  createGiveawayHandler,
  updateGiveawayStatusHandler,
} from '../controllers/adminGiveaway.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/admin/giveaways
router.post('/giveaways', authMiddleware, createGiveawayHandler);

// PATCH /api/admin/giveaways/:id/status
router.patch('/giveaways/:id/status', authMiddleware, updateGiveawayStatusHandler);

export default router;