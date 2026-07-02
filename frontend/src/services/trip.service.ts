import { apiClient } from './apiClient';
import { Trip, Itinerary } from '../mockData';

export const tripService = {
  getUserTrips: async (userId: string): Promise<Trip[]> => {
    return apiClient.get('/api/trips');
  },

  getTripDetails: async (tripId: string): Promise<Trip | undefined> => {
    return apiClient.get(`/api/trips/${tripId}`);
  },

  getItinerary: async (tripId: string): Promise<Itinerary | undefined> => {
    return apiClient.get(`/api/trips/${tripId}/itinerary`);
  },

  createTrip: async (data: Partial<Trip>): Promise<Trip> => {
    return apiClient.post('/api/trips', data);
  },

  deleteTrip: async (tripId: string): Promise<boolean> => {
    await apiClient.delete(`/api/trips/${tripId}`);
    return true;
  },

  duplicateTrip: async (tripId: string): Promise<Trip> => {
    return apiClient.post(`/api/trips/${tripId}/duplicate`, {});
  }
};
