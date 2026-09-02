import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { generalLimiter } from './middleware/rateLimit.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import giveawayRoutes from './routes/giveaway.routes.js';
import participationRoutes from './routes/participation.routes.js';
import winnerRoutes from './routes/winner.routes.js';
import claimRoutes from './routes/claim.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true }));


// Security Middleware 
app.use(helmet());  // sets secure HTTP headers
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// General Middleware 
app.use(morgan('dev')); // log every request
app.use(generalLimiter); // global rate limit

// Health Check 
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'VELOOP Rewards API is running',
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/giveaways', giveawayRoutes);
app.use('/api/giveaways', participationRoutes);
app.use('/api/giveaways', winnerRoutes);
app.use('/api/giveaways', claimRoutes);

// 404 Handler 
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// Global Error Handler 
// Must be last catches all errors thrown in controllers
app.use(errorMiddleware);

export default app;