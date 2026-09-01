import FraudEvent from '../models/FraudEvent.model.js';

// Save a fraud event to database
export const logFraudEvent = async ({
    userId,
    giveawayId,
    deviceHash,
    ipAddress,
    riskScore,
    riskLevel,
    signals,
    action,
    reason,
}) => {
    return await FraudEvent.create({
        userId,
        giveawayId,
        deviceHash,
        ipAddress,
        riskScore,
        riskLevel,
        signals,
        action,
        reason,
    });
};

// Get all fraud events for a user
export const getUserFraudHistory = async (userId) => {
    return await FraudEvent.find({ userId }).sort({ createdAt: -1 });
};

// Get fraud events for a specific giveaway
export const getGiveawayFraudEvents = async (giveawayId) => {
    return await FraudEvent.find({ giveawayId }).sort({ createdAt: -1 });
};