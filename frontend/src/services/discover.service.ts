import { apiClient } from './apiClient';
import { Destination, Place } from '../mockData';

export const discoverService = {
  searchDestinations: async (query: string): Promise<Destination[]> => {
    return apiClient.get(`/api/destinations?q=${encodeURIComponent(query)}`);
  },

  getDestinationDetails: async (id: string): Promise<Destination | undefined> => {
    return apiClient.get(`/api/destinations/${id}`);
  },

  getTrendingDestinations: async (): Promise<Destination[]> => {
    // Falls back to retrieving all destinations for trending list
    return apiClient.get('/api/destinations');
  },

  getPlacesForDestination: async (destinationId: string, category?: string): Promise<Place[]> => {
    // Map to specific hotels/restaurants/attractions endpoint based on category
    if (category === 'hotel') {
      return apiClient.get(`/api/hotels/${destinationId}`);
    } else if (category === 'restaurant') {
      return apiClient.get(`/api/restaurants/${destinationId}`);
    } else {
      return apiClient.get(`/api/attractions/${destinationId}`);
    }
  }
};
