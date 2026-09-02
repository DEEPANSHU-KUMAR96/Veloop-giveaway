import API from '../../auth/services/authApi.js';

export const getWinnersAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/winners`);
    return response.data;
};

export const getPreviousWinnersAPI = async () => {
    const response = await API.get('/giveaways/previous/winners');
    return response.data;
};

export const checkMyWinnerStatusAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-winner-status`);
    return response.data;
};

export const claimPrizeAPI = async (giveawayId, claimData) => {
    const response = await API.post(`/giveaways/${giveawayId}/claim`, claimData);
    return response.data;
};

export const getMyClaimAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-claim`);
    return response.data;
};