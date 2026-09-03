import axios from 'axios';

// Dynamically use environment variable, live deployed URL, or fallback
const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // When running in the browser on the live deployed domain
    if (typeof window !== 'undefined' && window.location.origin.includes('veloop-giveaway.onrender.com')) {
        return `${window.location.origin}/api`;
    }
    // Default to the live Render backend
    return 'https://veloop-giveaway.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token to every outgoing request if present
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle 401 unauthorized gracefully
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const hadToken = localStorage.getItem('token');
            if (hadToken) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Only redirect if they had a session that expired
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export const registerAPI = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

export const loginAPI = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
};

export const getMeAPI = async () => {
    const response = await API.get('/auth/me');
    return response.data;
};

export default API;