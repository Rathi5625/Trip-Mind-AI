import { DashboardData } from "../types/dashboard"
import { MOCK_DASHBOARD_DATA } from "../constants/dashboardData"

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DASHBOARD_DATA)
      }, 800)
    })
  },
}
