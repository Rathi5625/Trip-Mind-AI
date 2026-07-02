import { DestinationInfo } from "../types/planner"
import { axiosInstance } from "@/services/apiClient"

export interface GenerationResult {
  destination: DestinationInfo
  itinerary: string
}

export const plannerService = {
  generateTripPlan: async (prompt: string): Promise<GenerationResult> => {
    const response = await axiosInstance.post<GenerationResult>('/api/planner/generate', { prompt });
    return response.data;
  }
}
