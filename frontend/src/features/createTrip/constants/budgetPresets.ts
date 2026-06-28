import { BudgetPreset, CurrencyType } from "../types/budget"

export const BUDGET_PRESETS: BudgetPreset[] = [
  {
    id: "budget",
    label: "Budget",
    description: "Hostels, street food, public transit.",
    rangeText: "< $1,500",
    minSpend: 500,
    maxSpend: 1500,
    defaultSpend: 1000,
    iconName: "piggy"
  },
  {
    id: "comfort",
    label: "Comfort",
    description: "3-4 star hotels, nice restaurants, taxis.",
    rangeText: "$1,500 - $3,000",
    minSpend: 1500,
    maxSpend: 3000,
    defaultSpend: 3000, // Matching the default $3,000 comfort choice from the mockup
    iconName: "bed"
  },
  {
    id: "premium",
    label: "Premium",
    description: "Boutique hotels, fine dining, private tours.",
    rangeText: "$3,000 - $6,000",
    minSpend: 3000,
    maxSpend: 6000,
    defaultSpend: 4500,
    iconName: "gem"
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "5-star resorts, Michelin stars, chauffeur.",
    rangeText: "$6,000+",
    minSpend: 6000,
    maxSpend: 10000,
    defaultSpend: 8000,
    iconName: "star"
  }
]

export const ALLOCATION_PERCENTAGES = {
  flights: 0.28333,      // $850 of $3000 = ~28.33%
  accommodation: 0.40,   // $1200 of $3000 = 40%
  dining: 0.15,          // $450 of $3000 = 15%
  activities: 0.16667    // $500 of $3000 = ~16.67%
}

export interface CurrencyConfig {
  rate: number
  symbol: string
  label: string
}

export const CURRENCY_CONFIGS: Record<CurrencyType, CurrencyConfig> = {
  USD: { rate: 1.0, symbol: "$", label: "USD" },
  EUR: { rate: 0.92, symbol: "€", label: "EUR" },
  JPY: { rate: 160.0, symbol: "¥", label: "JPY" }
}
