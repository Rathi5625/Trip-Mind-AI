import { useTravelDatesStore } from "../store/travelDatesStore"

export function useTravelDates() {
  const store = useTravelDatesStore()

  const getSelectedDaysCount = (): number => {
    const { start, end } = store.selectedRange
    if (!start || !end) return 0
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const clearSelection = () => {
    store.setSelectedRange({ start: null, end: null })
  }

  return {
    ...store,
    getSelectedDaysCount,
    clearSelection
  }
}
