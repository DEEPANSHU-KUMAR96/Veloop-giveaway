import mongoose from 'mongoose';

const participationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    giveawayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Giveaway',
        required: true
    },
    prizeId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'WINNER', 'NON_WINNER'],
        default: 'ACTIVE'
    },
    deviceHash: {
        type: String
    },
    ipAddress: {
        type: String
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

// THIS IS CRITICAL — prevents one user joining same giveaway twice
participationSchema.index({
    userId: 1,
    giveawayId: 1
}, { unique: true });

const GiveawayParticipationModel = mongoose.model('GiveawayParticipation', participationSchema);
export default GiveawayParticipationModel