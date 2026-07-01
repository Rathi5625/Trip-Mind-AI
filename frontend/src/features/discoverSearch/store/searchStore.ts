import { create } from "zustand"
import { SearchFilterState } from "../types/search"

export const useSearchStore = create<SearchFilterState>((set) => ({
  budgetRange: [20000, 250000],
  duration: "3-5 Days",
  travelStyles: ["Adventure", "Food", "Culture"],
  minMatchScore: 80,
  sortBy: "Highest Match",
  activeSearchQuery: "Japan",
  activeChips: ["Japan", "Culture"],
  activeAIFilters: [],
  favorites: [],

  setBudgetRange: (budgetRange) => set({ budgetRange }),
  setDuration: (duration) => set({ duration }),
  toggleTravelStyle: (style) => set((state) => {
    const exists = state.travelStyles.includes(style)
    const newStyles = exists 
      ? state.travelStyles.filter((s) => s !== style)
      : [...state.travelStyles, style]
    
    // Dynamically sync chips
    const newChips = state.activeChips.includes(style)
      ? state.activeChips.filter((c) => c !== style)
      : exists ? state.activeChips : [...state.activeChips, style]

    return { travelStyles: newStyles, activeChips: newChips }
  }),
  setMinMatchScore: (minMatchScore) => set({ minMatchScore }),
  setSortBy: (sortBy) => set({ sortBy }),
  setActiveSearchQuery: (activeSearchQuery) => set((state) => {
    const cleanChips = state.activeChips.filter((c) => c !== state.activeSearchQuery)
    return {
      activeSearchQuery,
      activeChips: [activeSearchQuery, ...cleanChips]
    }
  }),
  removeChip: (chip) => set((state) => {
    const nextChips = state.activeChips.filter((c) => c !== chip)
    let nextStyles = state.travelStyles
    let nextQuery = state.activeSearchQuery
    
    if (state.travelStyles.includes(chip)) {
      nextStyles = state.travelStyles.filter((s) => s !== chip)
    }
    if (state.activeSearchQuery === chip) {
      nextQuery = ""
    }
    
    return {
      activeChips: nextChips,
      travelStyles: nextStyles,
      activeSearchQuery: nextQuery
    }
  }),
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((favId) => favId !== id)
      : [...state.favorites, id]
  })),
  toggleAIFilter: (filter) => set((state) => ({
    activeAIFilters: state.activeAIFilters.includes(filter)
      ? state.activeAIFilters.filter((f) => f !== filter)
      : [...state.activeAIFilters, filter]
  })),
  resetFilters: () => set({
    budgetRange: [20000, 250000],
    duration: "3-5 Days",
    travelStyles: ["Adventure", "Food", "Culture"],
    minMatchScore: 80,
    sortBy: "Highest Match",
    activeSearchQuery: "Japan",
    activeChips: ["Japan", "Culture"],
    activeAIFilters: [],
    favorites: []
  })
}))
