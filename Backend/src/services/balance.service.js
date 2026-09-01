import mongoose from 'mongoose';
import UserModel from '../models/User.model.js';

// Dynamically use your existing User model
// Change 'User' to whatever your existing model is named
const User = mongoose.model('User');

// Get user's current balance for a specific currency
export const getUserBalance = async (userId, currency) => {
    const user = await User.findById(userId).select('VEs SVEs Tokens');

    if (!user) throw new Error('User not found');

    const balanceMap = {
        VEs: user.VEs || 0,
        SVEs: user.SVEs || 0,
        Tokens: user.Tokens || 0,
    };

    return balanceMap[currency] ?? 0;
};

// Check if user has enough balance
export const hasSufficientBalance = async (userId, currency, requiredAmount) => {
    const balance = await getUserBalance(userId, currency);
    return {
        hasSufficient: balance >= requiredAmount,
        currentBalance: balance,
        requiredAmount,
        shortfall: Math.max(0, requiredAmount - balance)
    };
};

// Deduct balance — ONLY called inside a MongoDB transaction
// Never call this alone — always use inside participationService
export const deductBalance = async (userId, currency, amount, session) => {
    const user = await User.findById(userId).session(session);

    if (!user) throw new Error('User not found');

    const currentBalance = user[currency] || 0;

    if (currentBalance < amount) {
        throw new Error(`Insufficient ${currency} balance`);
    }

    const balanceBefore = currentBalance;
    user[currency] = currentBalance - amount;
    await user.save({ session });

    return {
        balanceBefore,
        balanceAfter: user[currency]
    };
};