import Giveaway from '../models/Giveaway.model.js';
import { updateGiveawayStatus } from '../services/giveaway.service.js';

// POST /api/admin/giveaways
// Create a new giveaway with all prizes
export const createGiveawayHandler = async (req, res, next) => {
    try {
        // Validate that req.body exists
        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Request body is missing or empty. Make sure Content-Type: application/json header is set.'
            });
        }

        const {
            title,
            slug,
            description,
            startAt,
            endAt,
            prizes,
            rules,
            eligibility,
        } = req.body;

        // Validate required fields
        if (!title || !slug || !description || !startAt || !endAt || !prizes) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, slug, description, startAt, endAt, prizes'
            });
        }

        // Check slug is unique
        const existing = await Giveaway.findOne({ slug });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'A giveaway with this slug already exists'
            });
        }

        const giveaway = await Giveaway.create({
            title,
            slug,
            description,
            startAt: new Date(startAt),
            endAt: new Date(endAt),
            prizes,
            rules,
            eligibility,
            status: new Date(startAt) > new Date() ? 'UPCOMING' : 'ACTIVE',
        });

        res.status(201).json({
            success: true,
            message: 'Giveaway created successfully',
            data: giveaway
        });

    } catch (error) {
        next(error);
    }
};

// PATCH /api/admin/giveaways/:id/status
export const updateGiveawayStatusHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['UPCOMING', 'ACTIVE', 'ENDED', 'ARCHIVED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${validStatuses.join(', ')}`
            });
        }

        const giveaway = await updateGiveawayStatus(id, status);

        if (!giveaway) {
            return res.status(404).json({
                success: false,
                message: 'Giveaway not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `Giveaway status updated to ${status}`,
            data: giveaway
        });

    } catch (error) {
        next(error);
    }
};