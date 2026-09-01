import mongoose from 'mongoose';

const fraudEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    giveawayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Giveaway'
    },
    deviceHash: {
        type: String
    },
    ipAddress: {
        type: String
    },
    riskScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    riskLevel: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'LOW'
    },
    reason: {
        type: String
    },
    signals: [
        {
            type: String
        }
    ],
    action: {
        type: String,
        enum: ['FLAGGED', 'BLOCKED', 'ALLOWED'],
        default: 'FLAGGED'
    },
}, { timestamps: true });

const FraudEventModel = mongoose.model('FraudEvent', fraudEventSchema);

export default FraudEventModel;