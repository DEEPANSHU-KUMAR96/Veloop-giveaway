import mongoose from 'mongoose';

const prizeClaimSchema = new mongoose.Schema({
    giveawayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Giveaway',
        required: true
    },
    winnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GiveawayWinner',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    prizeId: {
        type: String,
        required: true
    },
    prizeType: {
        type: String,
        enum: ['PHYSICAL', 'GIFT_CARD', 'DIGITAL']
    },

    // For physical prizes
    fullName: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pinCode: {
        type: String
    },

    // For gift card prizes
    email: {
        type: String
    },

    status: {
        type: String,
        enum: ['NOT_SUBMITTED', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'EXPIRED'],
        default: 'NOT_SUBMITTED'
    },
    claimDeadline: {
        type: Date
    },
    submittedAt: {
        type: Date
    },
}, { timestamps: true });

const PrizeClaimModel = mongoose.model('PrizeClaim', prizeClaimSchema);

export default PrizeClaimModel;