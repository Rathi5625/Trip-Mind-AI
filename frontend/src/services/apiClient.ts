import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach JWT Bearer Token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Silent Token Refresh on 401 Expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          // Attempt token refresh
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken, user } = response.data;
          
          // Update credentials in global store
          useAuthStore.getState().login(user, token, newRefreshToken);

          // Retry the original request with new header
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh token expired/failed, perform sign out
          useAuthStore.getState().logout();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, sign out
        useAuthStore.getState().logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export const apiClient = {
  get: async <T>(url: string, mockData?: T): Promise<T> => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      if (mockData !== undefined) {
        return mockData; // Fallback to mock data in case of connection failure
      }
      throw error;
    }
  },

  post: async <T, D>(url: string, data: D, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },

  put: async <T, D>(url: string, data: D, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },

  delete: async <T>(url: string, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },
};
