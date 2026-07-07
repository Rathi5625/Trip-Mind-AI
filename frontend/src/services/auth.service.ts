import { apiClient } from './apiClient';
import { User } from '../mockData';
import { useAuthStore } from '@/store/authStore';

export const authService = {
  login: async (email: string, password: string): Promise<{ token: string; refreshToken: string; user: User }> => {
    return apiClient.post('/api/auth/login', { email, password });
  },

  signup: async (data: any): Promise<{ token: string; refreshToken: string; user: User }> => {
    return apiClient.post('/api/auth/signup', data);
  },

  verifyOtp: async (email: string, otp: string, source: string = "signup"): Promise<boolean> => {
    const endpoint = source === "forgot-password" ? "/api/auth/verify-reset-otp" : "/api/auth/verify-otp";
    const response = await apiClient.post<any, any>(endpoint, { email, code: otp });
    return response.success;
  },

  resendOtp: async (email: string, type: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>('/api/auth/resend-otp', { email, type });
    return response.success;
  },

  resetPassword: async (email: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>('/api/auth/forgot-password', { email });
    return response.success;
  },

  confirmResetPassword: async (email: string, password: string, code: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>('/api/auth/reset-password', { email, password, code });
    return response.success;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put('/api/users/profile', data);
  }
};
