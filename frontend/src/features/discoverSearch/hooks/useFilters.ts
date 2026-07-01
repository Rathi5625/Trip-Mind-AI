import { useSearchStore } from "../store/searchStore"
import { DURATION_OPTIONS, TRAVEL_STYLE_OPTIONS } from "../constants/searchFilters"

export function useFilters() {
  const {
    budgetRange,
    setBudgetRange,
    duration,
    setDuration,
    travelStyles,
    toggleTravelStyle,
    minMatchScore,
    setMinMatchScore,
    resetFilters
  } = useSearchStore()

  return {
    budgetRange,
    setBudgetRange,
    duration,
    setDuration,
    travelStyles,
    toggleTravelStyle,
    minMatchScore,
    setMinMatchScore,
    resetFilters,
    durationOptions: DURATION_OPTIONS,
    travelStyleOptions: TRAVEL_STYLE_OPTIONS
  }
}
