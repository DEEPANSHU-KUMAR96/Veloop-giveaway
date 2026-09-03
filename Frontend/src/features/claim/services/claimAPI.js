import API from '../../auth/services/authApi.js';

export const submitClaimAPI = async ({ giveawayId, claimData }) => {
    const response = await API.post(`/giveaways/${giveawayId}/claim`, claimData);
    return response.data;
};

export const getMyClaimAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-claim`);
    return response.data;
};

export const getMyWinnerStatusAPI = async (giveawayId) => {
    const response = await API.get(`/giveaways/${giveawayId}/my-winner-status`);
    return response.data;
};