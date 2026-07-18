import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { User } from '../mockData';

export const authService = {
  login: async (email: string, password: string): Promise<{ token: string; refreshToken: string; user: User }> => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  },

  signup: async (data: any): Promise<{ token: string; refreshToken: string; user: User }> => {
    return apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, data);
  },

  verifyOtp: async (email: string, otp: string, source: string = "signup"): Promise<boolean> => {
    const endpoint = source === "forgot-password" ? "/api/auth/verify-reset-otp" : API_ENDPOINTS.AUTH.VERIFY_OTP;
    const response = await apiClient.post<any, any>(endpoint, { email, code: otp });
    return response?.success ?? true;
  },

  resendOtp: async (email: string, type: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>(API_ENDPOINTS.AUTH.RESEND_OTP, { email, type });
    return response?.success ?? true;
  },

  resetPassword: async (email: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response?.success ?? true;
  },

  confirmResetPassword: async (email: string, password: string, code: string): Promise<boolean> => {
    const response = await apiClient.post<any, any>(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email, password, code });
    return response?.success ?? true;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put(API_ENDPOINTS.USERS.PROFILE, data);
  }
};
