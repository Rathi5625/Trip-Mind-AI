import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { Destination, Place } from '../mockData';

export const discoverService = {
  searchDestinations: async (query: string): Promise<Destination[]> => {
    return apiClient.get(API_ENDPOINTS.DESTINATIONS.SEARCH(query));
  },

  getDestinationDetails: async (id: string): Promise<Destination | undefined> => {
    return apiClient.get(API_ENDPOINTS.DESTINATIONS.BY_ID(id));
  },

  getTrendingDestinations: async (): Promise<Destination[]> => {
    return apiClient.get(API_ENDPOINTS.DESTINATIONS.BASE);
  },

  getPlacesForDestination: async (destinationId: string, category?: string): Promise<Place[]> => {
    if (category === 'hotel') {
      return apiClient.get(API_ENDPOINTS.HOTELS.BY_DESTINATION(destinationId));
    } else if (category === 'restaurant') {
      return apiClient.get(API_ENDPOINTS.RESTAURANTS.BY_DESTINATION(destinationId));
    } else {
      return apiClient.get(API_ENDPOINTS.ATTRACTIONS.BY_DESTINATION(destinationId));
    }
  }
};
