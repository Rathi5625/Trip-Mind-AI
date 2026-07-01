import { create } from "zustand"
import { DestinationStoreState } from "../types/destination"

export const useDestinationStore = create<DestinationStoreState>((set) => ({
  isSaved: false,
  selectedSeason: "Spring",
  selectedBudgetStyle: "Premium",
  activeGalleryIndex: null,

  toggleSaved: () => set((state) => ({ isSaved: !state.isSaved })),
  setSelectedSeason: (selectedSeason) => set({ selectedSeason }),
  setSelectedBudgetStyle: (selectedBudgetStyle) => set({ selectedBudgetStyle }),
  setActiveGalleryIndex: (activeGalleryIndex) => set({ activeGalleryIndex }),
  resetState: () => set({
    isSaved: false,
    selectedSeason: "Spring",
    selectedBudgetStyle: "Premium",
    activeGalleryIndex: null
  })
}))
