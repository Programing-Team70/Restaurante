import { axiosAuth } from './Api';

export const login = async (data) => {
    return await axiosAuth.post('/login', data);
};

export const register = async (data) => {
    return await axiosAuth.post('/register', data);
};

export const forgotPassword = async (email) => {
    return await axiosAuth.post('/forgot-password', { email });
};

export const resetPassword = async (token, newPassword) => {
    return await axiosAuth.post('/reset-password', { token, newPassword });
};

export const verifyEmail = async (token) => {
    return await axiosAuth.post('/verify-email', { token });
};
