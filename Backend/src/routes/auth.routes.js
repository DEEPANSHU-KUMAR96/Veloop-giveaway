import express from 'express';
import {
    registerHandler,
    loginHandler,
    getMeHandler,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/me', authMiddleware, getMeHandler);

export default router;