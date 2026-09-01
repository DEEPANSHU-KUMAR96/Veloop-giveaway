import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
    giveawayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Giveaway',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prizeId: {
        type: String,
        required: true
    },
    prizeName: {
        type: String,
        required: true
    },
    prizeType: {
        type: String,
        enum: ['PHYSICAL', 'GIFT_CARD', 'DIGITAL']
    },
    displayName: {
        type: String
    },   // masked ID like VE****42
    announcedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const GiveawayWinnerModel = mongoose.model('GiveawayWinner', winnerSchema);

export default GiveawayWinnerModel;