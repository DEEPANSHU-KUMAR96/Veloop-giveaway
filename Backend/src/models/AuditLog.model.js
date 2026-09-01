import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    action: {
        type: String,
        required: true
    },  // e.g. "JOIN_GIVEAWAY"
    entity: {
        type: String
    },                  // e.g. "Giveaway"
    entityId: {
        type: mongoose.Schema.Types.ObjectId
    },
    details: {
        type: mongoose.Schema.Types.Mixed
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
}, { timestamps: true });

const AuditLogModel = mongoose.model('AuditLog', auditLogSchema);

export default AuditLogModel;