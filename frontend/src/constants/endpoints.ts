/**
 * Centralized API Endpoints Configuration
 * Single source of truth for all backend REST API routes.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    VERIFY_OTP: '/api/auth/verify-otp',
    RESEND_OTP: '/api/auth/resend-otp',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    REFRESH_TOKEN: '/api/auth/refresh',
  },
  USERS: {
    PROFILE: '/api/users/profile',
  },
  TRIPS: {
    BASE: '/api/trips',
    BY_ID: (id: string) => `/api/trips/${id}`,
    ITINERARY: (id: string) => `/api/trips/${id}/itinerary`,
    DUPLICATE: (id: string) => `/api/trips/${id}/duplicate`,
    OVERVIEW: (id: string) => `/api/trips/${id}/overview`,
    TIMELINE: (id: string) => `/api/trips/${id}/timeline`,
    PROGRESS: (id: string) => `/api/trips/${id}/progress`,
    FORECAST: (id: string) => `/api/trips/${id}/forecast`,
    BOOKINGS: (id: string) => `/api/trips/${id}/bookings`,
    ANALYTICS: (id: string) => `/api/trips/${id}/analytics`,
  },
  DESTINATIONS: {
    BASE: '/api/destinations',
    BY_ID: (id: string) => `/api/destinations/${id}`,
    RECOMMENDED: '/api/destinations?cat=recommended',
    HIDDEN_GEMS: '/api/destinations?cat=hidden_gems',
    TRENDING: '/api/destinations?cat=trending',
    SEARCH: (q: string) => `/api/destinations?q=${encodeURIComponent(q)}`,
  },
  HOTELS: {
    BY_DESTINATION: (destinationId: string) => `/api/hotels/${destinationId}`,
  },
  RESTAURANTS: {
    BY_DESTINATION: (destinationId: string) => `/api/restaurants/${destinationId}`,
  },
  ATTRACTIONS: {
    BY_DESTINATION: (destinationId: string) => `/api/attractions/${destinationId}`,
  },
  DASHBOARD: {
    BASE: '/api/dashboard',
  },
  AI: {
    CHAT: '/api/ai/chat',
    AI_CHAT_LEGACY: '/api/ai-chat',
    IMAGE: (q: string) => `/api/ai-chat/image?q=${encodeURIComponent(q)}`,
    GENERATE: '/api/ai/generate',
    OPTIMIZE: '/api/ai/optimize',
    RECOMMENDATIONS: '/api/ai/recommendations',
    HIDDEN_GEMS: '/api/ai/hidden-gems',
  },
  MAP: {
    TILES: '/api/map',
  },
} as const;
