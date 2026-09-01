import PrizeClaim from '../models/PrizeClaim.model.js';
import GiveawayWinner from '../models/GiveawayWinner.model.js';
import AuditLog from '../models/AuditLog.model.js';

// POST /api/giveaways/:giveawayId/claim
export const submitClaimHandler = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { giveawayId } = req.params;

        // Verify user is actually a winner
        const winner = await GiveawayWinner.findOne({
            userId,
            giveawayId
        });

        if (!winner) {
            return res.status(403).json({
                success: false,
                message: 'You are not a winner for this giveaway'
            });
        }

        // Check if claim already submitted
        const existingClaim = await PrizeClaim.findOne({
            userId,
            giveawayId
        });
        if (existingClaim) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted a claim',
                data: {
                    status: existingClaim.status
                }
            });
        }

        // Backend determines prize type — never trust frontend
        const prizeType = winner.prizeType;

        const claimData = {
            giveawayId,
            winnerId: winner._id,
            userId,
            prizeId: winner.prizeId,
            prizeType,
            claimDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            submittedAt: new Date(),
            status: 'SUBMITTED',
        };

        // PHYSICAL prize validation
        if (prizeType === 'PHYSICAL') {
            const { fullName, phone, address, city, state, pinCode } = req.body;

            if (!fullName || !phone || !address || !city || !state || !pinCode) {
                return res.status(400).json({
                    success: false,
                    message: 'fullName, phone, address, city, state aur pinCode are required for PHYSICAL prize'
                });
            }

            // Basic phone validation
            if (!/^[6-9]\d{9}$/.test(phone)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid phone number — must be 10 digits indian mobile number'
                });
            }

            // Basic PIN validation
            if (!/^\d{6}$/.test(pinCode)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid PIN code — must be 6 digits'
                });
            }

            claimData.fullName = fullName;
            claimData.phone = phone;
            claimData.address = address;
            claimData.city = city;
            claimData.state = state;
            claimData.pinCode = pinCode;
        }

        // GIFT_CARD prize validation
        if (prizeType === 'GIFT_CARD') {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is required for GIFT_CARD prize'
                });
            }

            // Basic email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email address'
                });
            }

            claimData.email = email;
        }

        const claim = await PrizeClaim.create(claimData);

        // Audit log
        await AuditLog.create({
            userId,
            action: 'CLAIM_PRIZE',
            entity: 'PrizeClaim',
            entityId: claim._id,
            details: { prizeId: winner.prizeId, prizeType },
            ipAddress: req.ip,
        });

        res.status(201).json({
            success: true,
            message: 'Prize claim submitted successfully! Our team will contact you soon.',
            data: {
                claimId: claim._id,
                status: claim.status,
                prizeType,
                claimDeadline: claim.claimDeadline,
            }
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/giveaways/:giveawayId/my-claim
export const getMyClaimHandler = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { giveawayId } = req.params;

        const claim = await PrizeClaim.findOne({ userId, giveawayId })
            .select('-fullName -phone -address -email');

        if (!claim) {
            return res.status(404).json({
                success: false,
                message: 'Claim not found'
            });
        }

        res.status(200).json({
            success: true,
            data: claim
        });

    } catch (error) {
        next(error);
    }
};