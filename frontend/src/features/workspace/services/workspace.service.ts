import { apiClient } from "@/services/apiClient"
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
    return apiClient.get(`/api/trips/${tripId}/overview`)
  },

  getTimeline: async (tripId: string): Promise<ItineraryDay[]> => {
    return apiClient.get(`/api/trips/${tripId}/timeline`)
  },

  getProgress: async (tripId: string): Promise<ProgressData> => {
    return apiClient.get(`/api/trips/${tripId}/progress`)
  },

  getForecast: async (tripId: string): Promise<ForecastData[]> => {
    return apiClient.get(`/api/trips/${tripId}/forecast`)
  },

  getBookings: async (tripId: string): Promise<Booking[]> => {
    return apiClient.get(`/api/trips/${tripId}/bookings`)
  },

  getAnalytics: async (tripId: string): Promise<AnalyticsData> => {
    return apiClient.get(`/api/trips/${tripId}/analytics`)
  }
}
