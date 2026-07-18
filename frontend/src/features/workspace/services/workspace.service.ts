import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"
import {
  WorkspaceOverview,
  ItineraryDay,
  Booking,
  AnalyticsData,
  ForecastData,
  ProgressData
} from "../types/workspace"

export const workspaceService = {
  getOverview: async (tripId: string): Promise<WorkspaceOverview> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.OVERVIEW(tripId))
  },

  getTimeline: async (tripId: string): Promise<ItineraryDay[]> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.TIMELINE(tripId))
  },

  getProgress: async (tripId: string): Promise<ProgressData> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.PROGRESS(tripId))
  },

  getForecast: async (tripId: string): Promise<ForecastData[]> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.FORECAST(tripId))
  },

  getBookings: async (tripId: string): Promise<Booking[]> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.BOOKINGS(tripId))
  },

  getAnalytics: async (tripId: string): Promise<AnalyticsData> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.ANALYTICS(tripId))
  }
}
