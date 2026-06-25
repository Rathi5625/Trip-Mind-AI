"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface OnboardingStoreState {
  // Step 2
  selectedTravelerTypes: string[]
  toggleTravelerType: (typeId: string) => void
  setTravelerTypes: (types: string[]) => void
  clearTravelerTypes: () => void

  // Step 3
  budget: string | null
  duration: string | null
  group: string | null
  pace: string | null
  setBudget: (budget: string | null) => void
  setDuration: (duration: string | null) => void
  setGroup: (group: string | null) => void
  setPace: (pace: string | null) => void
  clearPreferences: () => void

  // Step 4
  selectedDestinations: string[]
  toggleDestination: (destId: string) => void
  setDestinations: (destIds: string[]) => void
  clearDestinations: () => void
}

export const useOnboardingStore = create<OnboardingStoreState>()(
  persist(
    (set) => ({
      // Step 2
      selectedTravelerTypes: [],
      toggleTravelerType: (typeId) =>
        set((state) => {
          const exists = state.selectedTravelerTypes.includes(typeId)
          if (exists) {
            return {
              selectedTravelerTypes: state.selectedTravelerTypes.filter(
                (id) => id !== typeId
              ),
            }
          } else {
            return {
              selectedTravelerTypes: [...state.selectedTravelerTypes, typeId],
            }
          }
        }),
      setTravelerTypes: (types) => set({ selectedTravelerTypes: types }),
      clearTravelerTypes: () => set({ selectedTravelerTypes: [] }),

      // Step 3
      budget: null,
      duration: null,
      group: null,
      pace: null,
      setBudget: (budget) => set({ budget }),
      setDuration: (duration) => set({ duration }),
      setGroup: (group) => set({ group }),
      setPace: (pace) => set({ pace }),
      clearPreferences: () =>
        set({
          budget: null,
          duration: null,
          group: null,
          pace: null,
        }),

      // Step 4
      selectedDestinations: [],
      toggleDestination: (destId) =>
        set((state) => {
          const exists = state.selectedDestinations.includes(destId)
          if (exists) {
            return {
              selectedDestinations: state.selectedDestinations.filter(
                (id) => id !== destId
              ),
            }
          } else {
            return {
              selectedDestinations: [...state.selectedDestinations, destId],
            }
          }
        }),
      setDestinations: (destIds) => set({ selectedDestinations: destIds }),
      clearDestinations: () => set({ selectedDestinations: [] }),
    }),
    {
      name: "tripmind-onboarding-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
