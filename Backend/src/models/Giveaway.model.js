import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    position: {
        type: Number,
        required: true
    },  // 1st, 2nd, 3rd prize
    image: {
        type: String
    },
    type: {
        type: String,
        enum: ['PHYSICAL', 'GIFT_CARD', 'DIGITAL'],
        required: true
    },
    winnerCount: {
        type: Number,
        default: 1
    },
    currency: {
        type: String,
        enum: ['VEs', 'SVEs', 'Tokens'],
        required: true
    },
    entryFee: {
        type: Number,
        required: true
    },
});

const giveawaySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['UPCOMING', 'ACTIVE', 'ENDED', 'ARCHIVED'],
        default: 'UPCOMING'
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    prizes: [prizeSchema],
    rules: [
        {
            type: String
        }],
    eligibility: {
        type: String
    },
    totalParticipants: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const GiveawayModel = mongoose.model('Giveaway', giveawaySchema);

export default GiveawayModel;
