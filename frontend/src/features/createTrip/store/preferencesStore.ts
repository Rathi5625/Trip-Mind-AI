import { create } from "zustand"
import { PreferencesState } from "../types/preferences"

export const usePreferencesStore = create<PreferencesState>((set) => ({
  selectedInterests: [],
  selectedAccommodation: "boutique", // Default Boutique
  travelPace: "balanced", // Default Balanced

  toggleInterest: (id) => set((state) => {
    const isSelected = state.selectedInterests.includes(id)
    const newInterests = isSelected
      ? state.selectedInterests.filter((i) => i !== id)
      : [...state.selectedInterests, id]
    return { selectedInterests: newInterests }
  }),

  setSelectedAccommodation: (id) => set({ selectedAccommodation: id }),
  setTravelPace: (pace) => set({ travelPace: pace }),
  
  resetPreferencesStore: () => set({
    selectedInterests: [],
    selectedAccommodation: "boutique",
    travelPace: "balanced"
  })
}))
