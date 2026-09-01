import mongoose from 'mongoose';

const entryTransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
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
    currency: {
        type: String,
        enum: ['VEs', 'SVEs', 'Tokens'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balanceBefore: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED', 'REVERSED'],
        default: 'PENDING'
    },
    type: {
        type: String,
        default: 'GIVEAWAY_ENTRY'
    },
}, { timestamps: true });

const GiveawayEntryTransactionModel = mongoose.model('GiveawayEntryTransaction', entryTransactionSchema);

export default GiveawayEntryTransactionModel;