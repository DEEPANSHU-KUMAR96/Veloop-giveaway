import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCurrentGiveaway,
    fetchGiveawayBySlug,
    fetchPreviousGiveaways,
    fetchMyParticipation,
    joinGiveaway,
    clearGiveawayError,
    resetJoinState,
} from '../state/giveawaySlice.js';

const useGiveaway = () => {
    const dispatch = useDispatch();
    const {
        current,
        previous,
        myStatus,
        isLoading,
        isJoining,
        joinSuccess,
        joinError,
        error,
    } = useSelector((state) => state.giveaway);

    const getCurrentGiveaway = () => {
        dispatch(fetchCurrentGiveaway());
    };

    const getGiveawayBySlug = (slug) => {
        dispatch(fetchGiveawayBySlug(slug));
    };

    const getPreviousGiveaways = () => {
        dispatch(fetchPreviousGiveaways());
    };

    const getMyParticipation = (giveawayId) => {
        dispatch(fetchMyParticipation(giveawayId));
    };

    const enterGiveaway = async (giveawayId, entryData = {}) => {
        return await dispatch(joinGiveaway({ giveawayId, entryData }));
    };

    const clearError = () => {
        dispatch(clearGiveawayError());
    };

    const resetJoin = () => {
        dispatch(resetJoinState());
    };

    // Helper — calculate time remaining from backend timestamp
    const getTimeRemaining = () => {
        if (!current?.endAt && !current?.endDate && !current?.endsAt) return null;

        const endTimeStr = current.endAt || current.endDate || current.endsAt;
        const now = new Date();
        const endTime = new Date(endTimeStr);
        const diff = endTime - now;

        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };
    };

    return {
        current,
        previous,
        myStatus,
        isLoading,
        isJoining,
        joinSuccess,
        joinError,
        error,
        getCurrentGiveaway,
        getGiveawayBySlug,
        getPreviousGiveaways,
        getMyParticipation,
        enterGiveaway,
        clearError,
        resetJoin,
        getTimeRemaining,
    };
};

export default useGiveaway;