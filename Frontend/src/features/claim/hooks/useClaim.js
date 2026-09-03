import { useDispatch, useSelector } from 'react-redux';
import {
    submitClaim,
    fetchMyClaim,
    clearClaimState,
    resetClaim,
} from '../state/claimSlice.js';

const useClaim = () => {
    const dispatch = useDispatch();
    const claimState = useSelector((state) => state.claim) || {};
    const {
        claim = null,
        isLoading = false,
        error = null,
        success = false,
    } = claimState;

    const submitMyClaim = (giveawayId, claimData) => {
        return dispatch(submitClaim({ giveawayId, claimData }));
    };

    const submitMyClaimAsync = async (giveawayId, claimData) => {
        return await dispatch(submitClaim({ giveawayId, claimData })).unwrap();
    };

    const getMyClaim = (giveawayId) => {
        return dispatch(fetchMyClaim(giveawayId));
    };

    const clearState = () => dispatch(clearClaimState());
    const resetAllClaimState = () => dispatch(resetClaim());

    // Claim status helper
    const getClaimStatusInfo = (customStatus) => {
        const targetStatus = customStatus || claim?.status;
        if (!targetStatus) return { text: 'Not Submitted', color: '#888', icon: '📋', badgeClass: 'bg-secondary' };

        const statusMap = {
            NOT_SUBMITTED: { text: 'Not Submitted', color: '#888888', icon: '📋', badgeClass: 'bg-secondary' },
            SUBMITTED: { text: 'Claim Submitted', color: '#f5a623', icon: '📨', badgeClass: 'bg-warning text-dark' },
            PROCESSING: { text: 'Prize Verification In Progress', color: '#00d4ff', icon: '⚙️', badgeClass: 'bg-info text-dark' },
            COMPLETED: { text: 'Prize Delivered ✓', color: '#4ade80', icon: '✅', badgeClass: 'bg-success' },
            EXPIRED: { text: 'Claim Window Expired', color: '#ef4444', icon: '❌', badgeClass: 'bg-danger' },
        };

        return statusMap[targetStatus] || statusMap.NOT_SUBMITTED;
    };

    return {
        claim,
        isLoading,
        error,
        success,
        submitMyClaim,
        submitMyClaimAsync,
        getMyClaim,
        clearState,
        resetAllClaimState,
        getClaimStatusInfo,
        hasClaimed: !!claim && claim.status !== 'NOT_SUBMITTED',
    };
};

export default useClaim;