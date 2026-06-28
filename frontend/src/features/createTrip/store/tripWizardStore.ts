import { create } from "zustand"
import { TripWizardState, WizardStep } from "../types/createTrip"

export const useTripWizardStore = create<TripWizardState>((set) => ({
  step: 1,
  searchQuery: "",
  selectedDestination: null,
  hoveredDestination: null,
  dates: {
    start: "",
    end: "",
  },
  travelers: "Couple", // Default
  preferences: [],
  voiceActive: false,
  isSearching: false,

  setStep: (step: WizardStep) => set({ step }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setSelectedDestination: (selectedDestination) => set({ selectedDestination }),
  setHoveredDestination: (hoveredDestination) => set({ hoveredDestination }),
  setDates: (dates) => set({ dates }),
  setTravelers: (travelers) => set({ travelers }),
  setPreferences: (preferences) => set({ preferences }),
  
  togglePreference: (pref: string) => set((state) => {
    const active = state.preferences.includes(pref)
    const preferences = active 
      ? state.preferences.filter((p) => p !== pref)
      : [...state.preferences, pref]
    return { preferences }
  }),

  setVoiceActive: (voiceActive: boolean) => set({ voiceActive }),
  setSearching: (isSearching: boolean) => set({ isSearching }),
  
  resetWizard: () => set({
    step: 1,
    searchQuery: "",
    selectedDestination: null,
    hoveredDestination: null,
    dates: { start: "", end: "" },
    travelers: "Couple",
    preferences: [],
    voiceActive: false,
    isSearching: false
  })
}))
