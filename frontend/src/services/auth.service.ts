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

  verifyOtp: async (otp: string): Promise<boolean> => {
    const email = useAuthStore.getState().user?.email || "traveler@tripmind.ai";
    const response = await apiClient.post<any, any>('/api/auth/verify-otp', { email, code: otp });
    return response.success;
  },

  resetPassword: async (email: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>('/api/auth/forgot-password', { email });
    return response.success;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put('/api/users/profile', data);
  }
};
