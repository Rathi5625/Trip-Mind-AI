import { create } from "zustand"
import { GeneratedTripState } from "../types/generatedTrip"

export const useGeneratedTripStore = create<GeneratedTripState>((set) => ({
  selectedTrip: null,

  setSelectedTrip: (trip) => set({ selectedTrip: trip }),
  resetGeneratedTripStore: () => set({ selectedTrip: null })
}))
