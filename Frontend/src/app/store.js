import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
