import crypto from 'crypto';
import FraudEvent from '../models/FraudEvent.model.js';
import GiveawayParticipation from '../models/GiveawayParticipation.model.js';

// Creates a hashed device fingerprint from request headers
// We hash it so we never store raw device data (privacy-safe)
const generateDeviceHash = (req) => {
    const raw = [
        req.headers['user-agent'] || '',
        req.headers['accept-language'] || '',
        req.headers['accept-encoding'] || '',
    ].join('|');

    return crypto.createHash('sha256').update(raw).digest('hex');
};

// Calculates risk score based on multiple signals
const calculateRiskScore = async (userId, giveawayId, deviceHash, ipAddress) => {
    let riskScore = 0;
    const signals = [];

    // Signal 1 — Same device already used for this giveaway
    const sameDevice = await GiveawayParticipation.findOne({
        giveawayId,
        deviceHash,
        userId: { $ne: userId }
    });

    if (sameDevice) {
        riskScore += 40;
        signals.push('SAME_DEVICE_DIFFERENT_USER');
    }

    // Signal 2 — Same IP already used for this giveaway by different user
    const sameIP = await GiveawayParticipation.findOne({
        giveawayId,
        ipAddress,
        userId: { $ne: userId }
    });

    if (sameIP) {
        riskScore += 20;
        signals.push('SAME_IP_DIFFERENT_USER');
    }

    // Signal 3 — User has previous fraud events
    const previousFraud = await FraudEvent.findOne({ userId });
    if (previousFraud) {
        riskScore += 30;
        signals.push('PREVIOUS_FRAUD_HISTORY');
    }

    // Determine risk level from score
    let riskLevel = 'LOW';
    if (riskScore >= 80) riskLevel = 'CRITICAL';
    else if (riskScore >= 60) riskLevel = 'HIGH';
    else if (riskScore >= 30) riskLevel = 'MEDIUM';

    return { riskScore, riskLevel, signals };
};

const fraudMiddleware = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const giveawayId = req.params.giveawayId || req.body.giveawayId;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const deviceHash = generateDeviceHash(req);

        // Attach to request so controllers can use it
        req.deviceHash = deviceHash;
        req.ipAddress = ipAddress;

        const { riskScore, riskLevel, signals } = await calculateRiskScore(
            userId, giveawayId, deviceHash, ipAddress
        );

        req.fraudData = { riskScore, riskLevel, signals };

        // Block CRITICAL risk requests immediately
        if (riskLevel === 'CRITICAL') {
            await FraudEvent.create({
                userId,
                giveawayId,
                deviceHash,
                ipAddress,
                riskScore,
                riskLevel,
                signals,
                action: 'BLOCKED',
                reason: 'Critical fraud risk detected'
            });

            return res.status(403).json({
                success: false,
                message: 'Your request was flagged. Please contact support.'
            });
        }

        // Flag HIGH risk but still allow (will be reviewed)
        if (riskLevel === 'HIGH') {
            await FraudEvent.create({
                userId,
                giveawayId,
                deviceHash,
                ipAddress,
                riskScore,
                riskLevel,
                signals,
                action: 'FLAGGED',
                reason: 'High fraud risk — flagged for review'
            });
        }

        next();

    } catch (error) {
        // Never block a user because fraud check itself failed
        console.error('Fraud middleware error:', error.message);
        next();
    }
};

export default fraudMiddleware;