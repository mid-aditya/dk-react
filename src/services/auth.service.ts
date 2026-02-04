import api from '../lib/axios';
import { AuthResponse, LoginResponse, User } from '../types/auth';

export const authService = {
    // POST v1/auth/register
    register: async (data: any): Promise<AuthResponse> => {
        const response = await api.post('/v1/auth/register', data);
        return response.data;
    },

    // POST v1/auth/login
    login: async (credentials: any): Promise<LoginResponse> => {
        // For Sanctum CSRF-based authentication, you first need to get the cookie
        // await api.get('/sanctum/csrf-cookie'); 

        const response = await api.post('/v1/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }
        return response.data;
    },

    // POST v1/auth/logout (auth:sanctum)
    logout: async (): Promise<{ message: string }> => {
        const response = await api.post('/v1/auth/logout');
        localStorage.removeItem('auth_token');
        return response.data;
    },

    // GET v1/auth/user (auth:sanctum)
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get('/v1/auth/user');
        return response.data;
    },

    // POST v1/auth/email/verification-notification
    sendVerificationEmail: async (): Promise<{ message: string }> => {
        const response = await api.post('/v1/auth/email/verification-notification');
        return response.data;
    },

    // GET v1/auth/email/verify/{id}/{hash}
    verifyEmail: async (id: string, hash: string, params: any): Promise<{ message: string }> => {
        const response = await api.get(`/v1/auth/email/verify/${id}/${hash}`, { params });
        return response.data;
    },
};
