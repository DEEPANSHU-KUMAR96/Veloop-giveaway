import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getWinnersAPI,
    getPreviousWinnersAPI,
    checkMyWinnerStatusAPI,
    claimPrizeAPI,
    getMyClaimAPI,
} from '../services/winnerAPI.js';

export const fetchWinners = createAsyncThunk(
    'winner/fetchAll',
    async (giveawayId, { rejectWithValue }) => {
        try {
            return await getWinnersAPI(giveawayId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch winners'
            );
        }
    }
);

export const fetchPreviousWinners = createAsyncThunk(
    'winner/fetchPrevious',
    async (_, { rejectWithValue }) => {
        try {
            return await getPreviousWinnersAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch previous winners'
            );
        }
    }
);

export const checkMyWinnerStatus = createAsyncThunk(
    'winner/checkMine',
    async (giveawayId, { rejectWithValue }) => {
        try {
            return await checkMyWinnerStatusAPI(giveawayId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to check winner status'
            );
        }
    }
);

export const submitPrizeClaim = createAsyncThunk(
    'winner/submitClaim',
    async ({ giveawayId, claimData }, { rejectWithValue }) => {
        try {
            return await claimPrizeAPI(giveawayId, claimData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to submit prize claim'
            );
        }
    }
);

export const fetchMyClaim = createAsyncThunk(
    'winner/fetchMyClaim',
    async (giveawayId, { rejectWithValue }) => {
        try {
            return await getMyClaimAPI(giveawayId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch claim status'
            );
        }
    }
);

const winnerSlice = createSlice({
    name: 'winner',
    initialState: {
        winners: [],
        previousWinners: [],
        myWinnerStatus: null,
        myClaim: null,
        isClaiming: false,
        claimSuccess: false,
        claimError: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearWinnerError: (state) => {
            state.error = null;
            state.claimError = null;
        },
        resetClaimState: (state) => {
            state.isClaiming = false;
            state.claimSuccess = false;
            state.claimError = null;
        },
    },
    extraReducers: (builder) => {
        // Current Winners
        builder
            .addCase(fetchWinners.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWinners.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                const data = payload?.data || payload?.winners || payload;
                state.winners = Array.isArray(data) ? data : data ? [data] : [];
            })
            .addCase(fetchWinners.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Previous Winners
        builder
            .addCase(fetchPreviousWinners.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPreviousWinners.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                const data = payload?.data || payload?.winners || payload;
                state.previousWinners = Array.isArray(data) ? data : data ? [data] : [];
            })
            .addCase(fetchPreviousWinners.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // My Winner Status
        builder
            .addCase(checkMyWinnerStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkMyWinnerStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                state.myWinnerStatus = payload?.data || payload;
            })
            .addCase(checkMyWinnerStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Submit Prize Claim
        builder
            .addCase(submitPrizeClaim.pending, (state) => {
                state.isClaiming = true;
                state.claimError = null;
                state.claimSuccess = false;
            })
            .addCase(submitPrizeClaim.fulfilled, (state, action) => {
                state.isClaiming = false;
                state.claimSuccess = true;
                state.myClaim = action.payload?.data || action.payload;
            })
            .addCase(submitPrizeClaim.rejected, (state, action) => {
                state.isClaiming = false;
                state.claimError = action.payload;
            });

        // Fetch My Claim
        builder
            .addCase(fetchMyClaim.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMyClaim.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myClaim = action.payload?.data || action.payload;
            })
            .addCase(fetchMyClaim.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { clearWinnerError, resetClaimState } = winnerSlice.actions;
export default winnerSlice.reducer;