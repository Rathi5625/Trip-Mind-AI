import { BudgetSlice } from "../types/review"

export const DEFAULT_BUDGET_BREAKDOWN = (totalUSD: number): BudgetSlice[] => {
  // Split the total budget into standard slices: Hotels (40%), Flights (25%), Food (20%), Activities (15%)
  return [
    {
      category: "Hotels",
      amount: Math.round(totalUSD * 0.4),
      percentage: 40,
      color: "bg-blue-600 dark:bg-blue-500"
    },
    {
      category: "Flights",
      amount: Math.round(totalUSD * 0.25),
      percentage: 25,
      color: "bg-[#8B5A2B] dark:bg-[#A0522D]" // Brown
    },
    {
      category: "Food",
      amount: Math.round(totalUSD * 0.2),
      percentage: 20,
      color: "bg-emerald-600 dark:bg-emerald-500"
    },
    {
      category: "Activities",
      amount: Math.round(totalUSD * 0.15),
      percentage: 15,
      color: "bg-slate-500 dark:bg-slate-400"
    }
  ]
}

export const INTEREST_ICON_MAP: Record<string, string> = {
  culinary: "Utensils",
  nature: "Palmtree",
  culture: "Landmark",
  shopping: "ShoppingBag",
  nightlife: "Beer",
  adventure: "Compass",
  luxury: "Gem",
  wellness: "Heart",
  history: "History",
  photography: "Camera",
  architecture: "Home",
  museums: "Columns"
}
