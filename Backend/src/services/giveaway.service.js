import Giveaway from '../models/Giveaway.model.js';

// Get the current active or upcoming giveaway
export const getCurrentGiveaway = async () => {
    const giveaway = await Giveaway.findOne({
        status: { $in: ['ACTIVE', 'UPCOMING'] }
    }).sort({ startAt: 1 });

    if (!giveaway) return null;

    // Double check — if endAt has passed but status is still ACTIVE
    // backend is the source of truth, not frontend countdown
    if (giveaway.status === 'ACTIVE' && new Date() > giveaway.endAt) {
        giveaway.status = 'ENDED';
        await giveaway.save();
    }

    return giveaway;
};

// Get a single giveaway by its slug (e.g. "iphone-15-pro")
export const getGiveawayBySlug = async (slug) => {
    return await Giveaway.findOne({ slug });
};

// Get a single giveaway by its ID
export const getGiveawayById = async (id) => {
    return await Giveaway.findById(id);
};

// Get all previous/archived giveaways
export const getPreviousGiveaways = async () => {
    return await Giveaway.find({
        status: { $in: ['ENDED', 'ARCHIVED'] }
    }).sort({ endAt: -1 });
};

// Update giveaway status — called by admin or scheduled job
export const updateGiveawayStatus = async (giveawayId, status) => {
    return await Giveaway.findByIdAndUpdate(
        giveawayId,
        { status },
        { new: true }
    );
};

// Auto-sync status based on current time
// Call this on every giveaway fetch to keep status accurate
export const syncGiveawayStatus = async (giveaway) => {
    const now = new Date();

    if (giveaway.status === 'UPCOMING' && now >= giveaway.startAt) {
        giveaway.status = 'ACTIVE';
        await giveaway.save();
    }

    if (giveaway.status === 'ACTIVE' && now > giveaway.endAt) {
        giveaway.status = 'ENDED';
        await giveaway.save();
    }

    return giveaway;
};