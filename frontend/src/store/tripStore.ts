import { create } from 'zustand';
import { Trip } from '../mockData';
import { tripService } from '../services';

interface TripState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  fetchTrips: (userId: string) => Promise<void>;
  addTrip: (trip: Trip) => void;
  removeTrip: (tripId: string) => void;
  updateTrip: (tripId: string, data: Partial<Trip>) => void;
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  isLoading: false,
  error: null,
  fetchTrips: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const trips = await tripService.getUserTrips(userId);
      set({ trips, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  addTrip: (trip) => set((state) => ({ trips: [trip, ...state.trips] })),
  removeTrip: (tripId) => set((state) => ({ trips: state.trips.filter(t => t.id !== tripId) })),
  updateTrip: (tripId, data) => set((state) => ({
    trips: state.trips.map(t => t.id === tripId ? { ...t, ...data } : t)
  }))
}));
