import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { generalLimiter } from './middleware/rateLimit.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import giveawayRoutes from './routes/giveaway.routes.js';
import participationRoutes from './routes/participation.routes.js';
import winnerRoutes from './routes/winner.routes.js';
import claimRoutes from './routes/claim.routes.js';
import adminRoutes from './routes/admin.routes.js';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("trust proxy", 1);

app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public'))); // for deployment


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

// ─── SPA Fallback ─────────────────────────────────────────────────────
// For any route that is NOT an API route, serve the React app's index.html
// This allows React Router to handle client-side routes like /giveaway, /login, /register, /winners etc.
app.get('*', (req, res, next) => {
    // Skip API routes — let them fall through to the 404 handler below
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// 404 Handler (only for unmatched /api/* routes now)
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
