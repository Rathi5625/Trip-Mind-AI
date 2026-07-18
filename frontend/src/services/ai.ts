import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "@/constants/endpoints";

export const aiService = {
  chat: async (message: string, tripId: string = "None", history: string = "") => {
    return apiClient.post(API_ENDPOINTS.AI.CHAT, { message, tripId, history });
  },

  planner: async (params: {
    destination: string;
    budget: string;
    pace: string;
    duration: number;
    startDate?: string;
    endDate?: string;
    travelersCount?: number;
  }) => {
    return apiClient.post('/api/ai/planner', params);
  },

  optimize: async (params: {
    tripId: string;
    itinerary?: any;
    safetyScore?: number;
    weather?: any;
    budget?: any;
  }) => {
    return apiClient.post(API_ENDPOINTS.AI.OPTIMIZE, params);
  },

  recommend: async (category: string, location: string, tripId?: string) => {
    return apiClient.post('/api/ai/recommend', { category, location, tripId });
  },

  hiddenGems: async (destinationName: string) => {
    return apiClient.post(API_ENDPOINTS.AI.HIDDEN_GEMS, { destinationName });
  },

  weather: async (destination: string, tripId?: string) => {
    return apiClient.post('/api/ai/weather', { destination, tripId });
  },

  budget: async (budgetLimit: number, tripId?: string) => {
    return apiClient.post('/api/ai/budget', { budgetLimit, tripId });
  },

  transport: async (destination: string, tripId?: string) => {
    return apiClient.post('/api/ai/transport', { destination, tripId });
  },

  destination: async (preferences: string) => {
    return apiClient.post('/api/ai/destination', { preferences });
  },

  activity: async (query: string) => {
    return apiClient.post('/api/ai/activity', { query });
  },

  itinerary: async (command: string, tripId?: string) => {
    return apiClient.post('/api/ai/itinerary', { command, tripId });
  },

  map: async (coordinates: any, tripId?: string) => {
    return apiClient.post('/api/ai/map', { coordinates, tripId });
  },

  search: async (query: string) => {
    return apiClient.post('/api/ai/search', { query });
  }
};
