import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// every API call include token
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

// if Token expire then logout
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
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