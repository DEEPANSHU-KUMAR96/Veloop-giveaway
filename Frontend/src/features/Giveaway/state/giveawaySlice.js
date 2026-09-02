import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getCurrentGiveawayAPI,
    getGiveawayBySlugAPI,
    getPreviousGiveawaysAPI,
    getMyParticipationAPI,
    joinGiveawayAPI,
} from '../services/giveawayAPI.js';

export const fetchCurrentGiveaway = createAsyncThunk(
    'giveaway/fetchCurrent',
    async (_, { rejectWithValue }) => {
        try {
            return await getCurrentGiveawayAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch current giveaway'
            );
        }
    }
);

export const fetchGiveawayBySlug = createAsyncThunk(
    'giveaway/fetchBySlug',
    async (slug, { rejectWithValue }) => {
        try {
            return await getGiveawayBySlugAPI(slug);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch giveaway'
            );
        }
    }
);

export const fetchPreviousGiveaways = createAsyncThunk(
    'giveaway/fetchPrevious',
    async (_, { rejectWithValue }) => {
        try {
            return await getPreviousGiveawaysAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch previous giveaways'
            );
        }
    }
);

export const fetchMyParticipation = createAsyncThunk(
    'giveaway/fetchMyParticipation',
    async (giveawayId, { rejectWithValue }) => {
        try {
            return await getMyParticipationAPI(giveawayId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch participation'
            );
        }
    }
);

export const joinGiveaway = createAsyncThunk(
    'giveaway/join',
    async ({ giveawayId, entryData }, { rejectWithValue }) => {
        try {
            return await joinGiveawayAPI(giveawayId, entryData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to join giveaway'
            );
        }
    }
);

const giveawaySlice = createSlice({
    name: 'giveaway',
    initialState: {
        current: null,
        previous: [],
        myStatus: null,
        isLoading: false,
        isJoining: false,
        joinSuccess: false,
        joinError: null,
        error: null,
    },
    reducers: {
        clearGiveawayError: (state) => {
            state.error = null;
            state.joinError = null;
            state.joinSuccess = false;
        },
        resetJoinState: (state) => {
            state.isJoining = false;
            state.joinSuccess = false;
            state.joinError = null;
        },
    },
    extraReducers: (builder) => {
        // Current Giveaway
        builder
            .addCase(fetchCurrentGiveaway.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentGiveaway.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                const data =
                    payload?.data?.giveaways ||
                    payload?.data?.giveaway ||
                    payload?.data ||
                    payload?.giveaways ||
                    payload?.giveaway ||
                    payload;
                state.current = data;
            })
            .addCase(fetchCurrentGiveaway.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Previous Giveaways
        builder
            .addCase(fetchPreviousGiveaways.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPreviousGiveaways.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                const data =
                    payload?.data?.giveaways ||
                    payload?.data?.previous ||
                    payload?.data ||
                    payload?.giveaways ||
                    payload?.previous ||
                    payload;
                state.previous = Array.isArray(data) ? data : data ? [data] : [];
            })
            .addCase(fetchPreviousGiveaways.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // My Participation
        builder
            .addCase(fetchMyParticipation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMyParticipation.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                state.myStatus = payload?.data || payload;
            })
            .addCase(fetchMyParticipation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Join Giveaway
        builder
            .addCase(joinGiveaway.pending, (state) => {
                state.isJoining = true;
                state.joinError = null;
                state.joinSuccess = false;
            })
            .addCase(joinGiveaway.fulfilled, (state, action) => {
                state.isJoining = false;
                state.joinSuccess = true;
                state.myStatus = action.payload?.data || action.payload;

                // Optimistically update totalParticipants in Redux state immediately
                if (state.current) {
                    if (Array.isArray(state.current)) {
                        state.current = state.current.map((g) => ({
                            ...g,
                            totalParticipants: (g.totalParticipants || 0) + 1,
                        }));
                    } else if (typeof state.current === 'object') {
                        state.current = {
                            ...state.current,
                            totalParticipants: (state.current.totalParticipants || 0) + 1,
                        };
                    }
                }
            })
            .addCase(joinGiveaway.rejected, (state, action) => {
                state.isJoining = false;
                state.joinError = action.payload;
            });
    },
});

export const { clearGiveawayError, resetJoinState } = giveawaySlice.actions;
export default giveawaySlice.reducer;