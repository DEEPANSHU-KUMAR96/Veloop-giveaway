import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice.js';
import giveawayReducer from '../features/Giveaway/state/giveawaySlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        giveaway: giveawayReducer,
    },
});

export default store;
