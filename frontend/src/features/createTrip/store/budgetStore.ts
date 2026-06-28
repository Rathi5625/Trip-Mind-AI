import { create } from "zustand"
import { BudgetState, BudgetTier } from "../types/budget"
import { BUDGET_PRESETS } from "../constants/budgetPresets"

const determineTier = (valInUSD: number): BudgetTier => {
  if (valInUSD < 1500) return "budget"
  if (valInUSD < 3000) return "comfort"
  if (valInUSD < 6000) return "premium"
  return "luxury"
}

export const useBudgetStore = create<BudgetState>((set) => ({
  currency: "USD",
  sliderValue: 3000, // Matches Comfort default
  selectedTier: "comfort",
  destination: "Tokyo",

  setCurrency: (currency) => set({ currency }),
  setSliderValue: (val) => set((state) => {
    const tier = determineTier(val)
    return {
      sliderValue: val,
      selectedTier: tier
    }
  }),
  setSelectedTier: (selectedTier) => set((state) => {
    const preset = BUDGET_PRESETS.find(p => p.id === selectedTier)
    const val = preset ? preset.defaultSpend : 3000
    return {
      selectedTier,
      sliderValue: val
    }
  }),
  setDestination: (destination) => set({ destination }),
  resetBudgetStore: () => set({
    currency: "USD",
    sliderValue: 3000,
    selectedTier: "comfort",
    destination: "Tokyo"
  })
}))
