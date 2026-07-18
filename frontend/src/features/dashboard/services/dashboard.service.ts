import { DashboardData } from "../types/dashboard"
import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.BASE)
  },
}
