import rateLimit from 'express-rate-limit';

// General API rate limit
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: 'Too many requests. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict limit for joining a giveaway
// This is critical — stops rapid repeated join attempts
export const joinLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3,
    message: {
        success: false,
        message: 'Too many join attempts. Please wait before trying again.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Limit for claim submissions
export const claimLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: {
        success: false,
        message: 'Too many claim attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});