import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitClaimAPI, getMyClaimAPI } from '../services/claimAPI.js';

export const submitClaim = createAsyncThunk(
    'claim/submit',
    async ({ giveawayId, claimData }, { rejectWithValue }) => {
        try {
            return await submitClaimAPI({ giveawayId, claimData });
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to submit claim'
            );
        }
    }
);

export const fetchMyClaim = createAsyncThunk(
    'claim/fetchMine',
    async (giveawayId, { rejectWithValue }) => {
        try {
            return await getMyClaimAPI(giveawayId);
        } catch (error) {
            // 404 matlab claim exist nahi karta — error nahi hai
            if (error.response?.status === 404) return { data: null };
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch claim'
            );
        }
    }
);

const claimSlice = createSlice({
    name: 'claim',
    initialState: {
        claim: null,
        isLoading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearClaimState: (state) => {
            state.error = null;
            state.success = false;
        },
        resetClaim: (state) => {
            state.claim = null;
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
        setClaimData: (state, action) => {
            state.claim = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Submit Claim
        builder
            .addCase(submitClaim.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitClaim.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.claim = action.payload?.data || action.payload;
            })
            .addCase(submitClaim.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch My Claim
        builder
            .addCase(fetchMyClaim.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMyClaim.fulfilled, (state, action) => {
                state.isLoading = false;
                state.claim = action.payload?.data || null;
            })
            .addCase(fetchMyClaim.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { clearClaimState, resetClaim, setClaimData } = claimSlice.actions;
export default claimSlice.reducer;