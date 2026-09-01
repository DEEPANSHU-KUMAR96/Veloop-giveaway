import express from 'express';
import {
  submitClaimHandler,
  getMyClaimHandler,
} from '../controllers/claim.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { claimLimiter } from '../middleware/rateLimit.middleware.js';
import { claimValidationRules } from '../validator/claim.validator.js';
import validationMiddleware from '../middleware/validation.middleware.js';

const router = express.Router();

// POST /api/giveaways/:giveawayId/claim
router.post(
  '/:giveawayId/claim',
  authMiddleware,
  claimLimiter,
  claimValidationRules(),
  validationMiddleware,
  submitClaimHandler
);

// GET /api/giveaways/:giveawayId/my-claim
router.get(
  '/:giveawayId/my-claim',
  authMiddleware,
  getMyClaimHandler
);

export default router;