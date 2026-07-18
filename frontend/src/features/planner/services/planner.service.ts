import { DestinationInfo } from "../types/planner"
import { apiClient } from "@/services/apiClient"

export interface GenerationResult {
  destination: DestinationInfo
  itinerary: string
}

export const plannerService = {
  generateTripPlan: async (prompt: string): Promise<GenerationResult> => {
    return apiClient.post<GenerationResult>('/api/planner/generate', { prompt });
  }
}
