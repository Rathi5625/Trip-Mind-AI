import { useBudgetStore } from "../store/budgetStore"
import { ALLOCATION_PERCENTAGES } from "../constants/budgetPresets"

export interface ExpenseBreakdownData {
  flights: number
  accommodation: number
  dining: number
  activities: number
}

export function useForecast() {
  const sliderValue = useBudgetStore((state) => state.sliderValue)

  const getBreakdown = (): ExpenseBreakdownData => {
    // Distribute allocation mathematically
    const flights = Math.round(sliderValue * ALLOCATION_PERCENTAGES.flights)
    const accommodation = Math.round(sliderValue * ALLOCATION_PERCENTAGES.accommodation)
    const dining = Math.round(sliderValue * ALLOCATION_PERCENTAGES.dining)
    // To avoid rounding mismatch, activities absorbs any minor offset
    const activities = sliderValue - (flights + accommodation + dining)

    return {
      flights,
      accommodation,
      dining,
      activities
    }
  }

  return {
    breakdown: getBreakdown(),
    total: sliderValue
  }
}
