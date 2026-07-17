import { axiosInstance } from "./apiClient"

export const aiService = {
  chat: async (message: string, tripId: string = "None", history: string = "") => {
    const response = await axiosInstance.post("/api/ai/chat", { message, tripId, history })
    return response.data
  },

  planner: async (params: {
    destination: string
    budget: string
    pace: string
    duration: number
    startDate?: string
    endDate?: string
    travelersCount?: number
  }) => {
    const response = await axiosInstance.post("/api/ai/planner", params)
    return response.data
  },

  optimize: async (params: {
    tripId: string
    itinerary?: any
    safetyScore?: number
    weather?: any
    budget?: any
  }) => {
    const response = await axiosInstance.post("/api/ai/optimize", params)
    return response.data
  },

  recommend: async (category: string, location: string, tripId?: string) => {
    const response = await axiosInstance.post("/api/ai/recommend", { category, location, tripId })
    return response.data
  },

  hiddenGems: async (destinationName: string) => {
    const response = await axiosInstance.post("/api/ai/hidden-gems", { destinationName })
    return response.data
  },

  weather: async (destination: string, tripId?: string) => {
    const response = await axiosInstance.post("/api/ai/weather", { destination, tripId })
    return response.data
  },

  budget: async (budgetLimit: number, tripId?: string) => {
    const response = await axiosInstance.post("/api/ai/budget", { budgetLimit, tripId })
    return response.data
  },

  transport: async (destination: string, tripId?: string) => {
    const response = await axiosInstance.post("/api/ai/transport", { destination, tripId })
    return response.data
  },

  destination: async (preferences: string) => {
    const response = await axiosInstance.post("/api/ai/destination", { preferences })
    return response.data
  },

  activity: async (query: string) => {
    const response = await axiosInstance.post("/api/ai/activity", { query })
    return response.data
  },

  itinerary: async (command: string, tripId?: string) => {
    const response = await axiosInstance.post("/api/ai/itinerary", { command, tripId })
    return response.data
  },

  map: async (coordinates: any, tripId?: string) => {
    const response = await axiosInstance.post("/api/ai/map", { coordinates, tripId })
    return response.data
  },

  search: async (query: string) => {
    const response = await axiosInstance.post("/api/ai/search", { query })
    return response.data
  }
}
