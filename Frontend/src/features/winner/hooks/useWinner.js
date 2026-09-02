import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWinners,
    fetchPreviousWinners,
    checkMyWinnerStatus,
    submitPrizeClaim,
    fetchMyClaim,
    clearWinnerError,
    resetClaimState,
} from '../state/winnerSlice.js';

const useWinner = () => {
    const dispatch = useDispatch();
    const {
        winners,
        previousWinners,
        myWinnerStatus,
        myClaim,
        isClaiming,
        claimSuccess,
        claimError,
        isLoading,
        error,
    } = useSelector((state) => state.winner);

    const getWinners = (giveawayId) => {
        dispatch(fetchWinners(giveawayId));
    };

    const getPreviousWinners = () => {
        dispatch(fetchPreviousWinners());
    };

    const checkIfWinner = (giveawayId) => {
        dispatch(checkMyWinnerStatus(giveawayId));
    };

    const claimPrize = async (giveawayId, claimData) => {
        return await dispatch(submitPrizeClaim({ giveawayId, claimData }));
    };

    const getMyClaim = (giveawayId) => {
        dispatch(fetchMyClaim(giveawayId));
    };

    const clearError = () => {
        dispatch(clearWinnerError());
    };

    const resetClaim = () => {
        dispatch(resetClaimState());
    };

    return {
        winners,
        previousWinners,
        myWinnerStatus,
        myClaim,
        isClaiming,
        claimSuccess,
        claimError,
        isLoading,
        error,
        getWinners,
        getPreviousWinners,
        checkIfWinner,
        claimPrize,
        getMyClaim,
        clearError,
        resetClaim,
        isWinner: myWinnerStatus?.isWinner || false,
        winnerData: myWinnerStatus?.winner || null,
    };
};

export default useWinner;