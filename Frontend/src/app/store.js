import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice.js';
import giveawayReducer from '../features/Giveaway/state/giveawaySlice.js';
import winnerReducer from '../features/winner/state/winnerSlice.js';
import claimReducer from '../features/claim/state/claimSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        giveaway: giveawayReducer,
        winner: winnerReducer,
        claim: claimReducer,
    },
});

export default store;

