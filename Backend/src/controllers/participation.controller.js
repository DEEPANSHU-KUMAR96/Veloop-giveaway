import { joinGiveaway, getMyStatus } from '../services/participation.service.js';

// POST /api/giveaways/:giveawayId/join
export const joinGiveawayHandler = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { giveawayId } = req.params;
        const { prizeId } = req.body;

        // These come from fraudMiddleware — already attached to req
        const deviceHash = req.deviceHash;
        const ipAddress = req.ipAddress;
        const fraudData = req.fraudData;

        if (!prizeId) {
            return res.status(400).json({
                success: false,
                message: 'prizeId is required'
            });
        }

        const result = await joinGiveaway({
            userId,
            giveawayId,
            prizeId,
            deviceHash,
            ipAddress,
            fraudData,
        });

        res.status(201).json({
            success: true,
            message: 'Successfully joined the giveaway!',
            data: result
        });

    } catch (error) {
        // Handle known service errors cleanly
        const knownErrors = {
            GIVEAWAY_NOT_FOUND: { 
                status: 404,
                 message: 'Giveaway not found' 
                },
            GIVEAWAY_NOT_ACTIVE: { 
                status: 400,
                 message: 'This giveaway is not active'
                 },
            PRIZE_NOT_FOUND: {
                 status: 404, 
                 message: 'Prize not found'
                 },
            ALREADY_PARTICIPATED: {
                 status: 400,
                  message: 'You have already joined this giveaway' 
                },
        };

        // Handle insufficient balance with dynamic message
        if (error.message.startsWith('INSUFFICIENT_BALANCE')) {
            const [, currency, shortfall] = error.message.split(':');
            return res.status(400).json({
                success: false,
                message: `Insufficient ${currency}. You need ${shortfall} more ${currency} to participate.`
            });
        }

        const known = knownErrors[error.message];
        if (known) {
            return res.status(known.status).json({
                success: false,
                message: known.message
            });
        }

        next(error);
    }
};

// GET /api/giveaways/:giveawayId/my-participation
export const getMyParticipationHandler = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { giveawayId } = req.params;

        const result = await getMyStatus(userId, giveawayId);

        res.status(200).json({
            success: true,
            data: result,
            message: 'Successfully fetched your participation status'
        });

    } catch (error) {
        next(error);
    }
};