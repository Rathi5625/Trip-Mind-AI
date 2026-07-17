import { DashboardData } from "../types/dashboard"
import { axiosInstance } from "@/services/apiClient"

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get("/api/dashboard")
    return response.data
  },
}
