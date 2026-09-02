import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    loginUser,
    registerUser,
    fetchMe,
    logout,
    clearError,
} from '../state/authSlice.js';

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        user,
        token,
        isLoading,
        error,
        success,
    } = useSelector((state) => state.auth);

    const login = async (credentials) => {
        const result = await dispatch(loginUser(credentials));
        if (loginUser.fulfilled.match(result)) {
            navigate('/giveaway');
        }
    };

    const register = async (userData) => {
        const result = await dispatch(registerUser(userData));
        if (registerUser.fulfilled.match(result)) {
            navigate('/giveaway');
        }
    };

    const getMe = () => dispatch(fetchMe());

    const logoutUser = () => {
        dispatch(logout());
        navigate('/login');
    };

    const clearAuthError = () => dispatch(clearError());

    return {
        user,
        token,
        isLoading,
        error,
        success,
        isAuthenticated: !!token,
        login,
        register,
        logoutUser,
        getMe,
        clearAuthError,
    };
};

export default useAuth;