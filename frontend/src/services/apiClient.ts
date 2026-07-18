import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";
import { API_ENDPOINTS } from "@/constants/endpoints";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach JWT Bearer Token if present & JSON headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Token Refresh & Centralized Error Interception
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          // Attempt silent token refresh
          const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken, user } = response.data;

          // Update credentials in global store
          useAuthStore.getState().login(user, token, newRefreshToken);

          // Retry original request with updated authorization header
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().logout();
          if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        useAuthStore.getState().logout();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.warn(`[API Error ${status || "Network"}] ${originalRequest?.url}:`, error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig, mockData?: T): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      if (mockData !== undefined) {
        return mockData;
      }
      throw error;
    }
  },

  post: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },

  put: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },

  patch: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig, mockResponse?: T): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      if (mockResponse !== undefined) {
        return mockResponse;
      }
      throw error;
    }
  },
};
