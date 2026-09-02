import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerAPI, loginAPI, getMeAPI } from '../services/authApi.js';

const token = localStorage.getItem('token');
let user = null;
try {
    const savedUser = localStorage.getItem('user');
    user = savedUser ? JSON.parse(savedUser) : null;
} catch (e) {
    user = null;
}

// ── Async Thunks ──────────────────────────────────────

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            return await registerAPI(userData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Registration failed'
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            return await loginAPI(credentials);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Login failed'
            );
        }
    }
);

export const fetchMe = createAsyncThunk(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            return await getMeAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch user'
            );
        }
    }
);

// ── Slice ─────────────────────────────────────────────

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user || null,
        token: token || null,
        isLoading: false,
        error: null,
        success: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.success = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                const receivedToken =
                    action.payload?.token || action.payload?.data?.token;
                const receivedUser =
                    action.payload?.data?.user ||
                    action.payload?.data ||
                    action.payload?.user;

                state.token = receivedToken || state.token;
                state.user = receivedUser || state.user;

                if (receivedToken) localStorage.setItem('token', receivedToken);
                if (receivedUser) localStorage.setItem('user', JSON.stringify(receivedUser));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                const receivedToken =
                    action.payload?.token || action.payload?.data?.token;
                const receivedUser =
                    action.payload?.data?.user ||
                    action.payload?.data ||
                    action.payload?.user;

                state.token = receivedToken || state.token;
                state.user = receivedUser || state.user;

                if (receivedToken) localStorage.setItem('token', receivedToken);
                if (receivedUser) localStorage.setItem('user', JSON.stringify(receivedUser));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch Me
        builder
            .addCase(fetchMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.isLoading = false;
                const receivedUser =
                    action.payload?.data?.user ||
                    action.payload?.data ||
                    action.payload?.user;
                state.user = receivedUser || state.user;
                if (receivedUser) localStorage.setItem('user', JSON.stringify(receivedUser));
            })
            .addCase(fetchMe.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;