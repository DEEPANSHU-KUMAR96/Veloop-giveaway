import API from '../../auth/services/authApi.js';

// ── Public Giveaway Endpoints ────────────────────────────────────────

// GET /api/giveaways/current
export const getCurrentGiveawayAPI = async () => {
    const response = await API.get('/giveaways/current');
    return response.data;
};

// GET /api/giveaways/:slug
export const getGiveawayBySlugAPI = async (slug) => {
    const response = await API.get(`/giveaways/${slug}`);
    return response.data;
};

// GET /api/giveaways/previous
export const getPreviousGiveawaysAPI = async () => {
    const response = await API.get('/giveaways/previous');
    return response.data;
};

// ── Participation Endpoints ──────────────────────────────────────────

// POST /api/giveaways/:giveawayId/join
export const joinGiveawayAPI = async (giveawayId, entryData = {}) => {
    const payload =
        typeof entryData === 'string'
            ? { prizeId: entryData }
            : {
                  prizeId: entryData?.prizeId || entryData?.selectedPrizeId,
                  ...entryData,
              };

    if (!payload.prizeId && giveawayId) {
        payload.prizeId = giveawayId;
    }

    const response = await API.post(`/giveaways/${giveawayId}/join`, payload);
    return response.data;
};

// GET /api/giveaways/:giveawayId/my-participation
export const getMyParticipationAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-participation`);
    return response.data;
};

// GET /api/giveaways/:id/my-status (returns hasJoined, participation, isWinner, winner, balanceInfo)
export const getMyGiveawayStatusAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-status`);
    return response.data;
};

// ── Winners Endpoints ────────────────────────────────────────────────

// GET /api/giveaways/previous/winners
export const getPreviousWinnersAPI = async () => {
    const response = await API.get('/giveaways/previous/winners');
    return response.data;
};

// GET /api/giveaways/:id/winners
export const getGiveawayWinnersAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/winners`);
    return response.data;
};

// GET /api/giveaways/:id/my-winner-status
export const getMyWinnerStatusAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-winner-status`);
    return response.data;
};

// ── Claim Endpoints ──────────────────────────────────────────────────

// POST /api/giveaways/:giveawayId/claim
export const claimPrizeAPI = async (giveawayId, claimData) => {
    const response = await API.post(`/giveaways/${giveawayId}/claim`, claimData);
    return response.data;
};

// GET /api/giveaways/:giveawayId/my-claim
export const getMyClaimAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-claim`);
    return response.data;
};