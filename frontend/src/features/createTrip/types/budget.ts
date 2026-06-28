export type CurrencyType = "USD" | "EUR" | "JPY"
export type BudgetTier = "budget" | "comfort" | "premium" | "luxury"

export interface BudgetPreset {
  id: BudgetTier
  label: string
  description: string
  rangeText: string
  minSpend: number // in USD
  maxSpend: number // in USD
  defaultSpend: number // in USD
  iconName: "piggy" | "bed" | "gem" | "star"
  hoverDetails?: {
    accommodation: string
    dining: string
    activities: string
  }
}

export interface BudgetState {
  currency: CurrencyType
  sliderValue: number // Always stored in USD internally
  selectedTier: BudgetTier
  destination: string

  setCurrency: (currency: CurrencyType) => void
  setSliderValue: (val: number) => void
  setSelectedTier: (tier: BudgetTier) => void
  setDestination: (dest: string) => void
  resetBudgetStore: () => void
}
