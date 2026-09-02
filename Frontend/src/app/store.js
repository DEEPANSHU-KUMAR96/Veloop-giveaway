import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice.js';
import giveawayReducer from '../features/Giveaway/state/giveawaySlice.js';
import winnerReducer from '../features/winner/state/winnerSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        giveaway: giveawayReducer,
        winner: winnerReducer,
    },
});

export default store;
