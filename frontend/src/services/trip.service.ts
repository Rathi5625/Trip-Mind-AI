import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { Trip, Itinerary } from '../mockData';

export const tripService = {
  getUserTrips: async (userId: string): Promise<Trip[]> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.BASE);
  },

  getTripDetails: async (tripId: string): Promise<Trip | undefined> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.BY_ID(tripId));
  },

  getItinerary: async (tripId: string): Promise<Itinerary | undefined> => {
    return apiClient.get(API_ENDPOINTS.TRIPS.ITINERARY(tripId));
  },

  createTrip: async (data: Partial<Trip>): Promise<Trip> => {
    return apiClient.post(API_ENDPOINTS.TRIPS.BASE, data);
  },

  deleteTrip: async (tripId: string): Promise<boolean> => {
    await apiClient.delete(API_ENDPOINTS.TRIPS.BY_ID(tripId));
    return true;
  },

  duplicateTrip: async (tripId: string): Promise<Trip> => {
    return apiClient.post(API_ENDPOINTS.TRIPS.DUPLICATE(tripId), {});
  }
};
