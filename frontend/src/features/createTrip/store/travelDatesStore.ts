import { create } from "zustand"
import { TravelDatesState } from "../types/travelDates"

export const useTravelDatesStore = create<TravelDatesState>((set) => ({
  selectedRange: {
    start: new Date(2024, 9, 12), // Oct 12, 2024
    end: new Date(2024, 9, 24),   // Oct 24, 2024
  },
  hoveredDate: null,
  currentMonth: new Date(2024, 9, 1), // Oct 2024
  destination: "Tokyo",

  setSelectedRange: (selectedRange) => set({ selectedRange }),
  setHoveredDate: (hoveredDate) => set({ hoveredDate }),
  setCurrentMonth: (currentMonth) => set({ currentMonth }),
  setDestination: (destination) => set({ destination }),
  
  resetDatesStore: () => set({
    selectedRange: {
      start: new Date(2024, 9, 12),
      end: new Date(2024, 9, 24),
    },
    hoveredDate: null,
    currentMonth: new Date(2024, 9, 1),
    destination: "Tokyo"
  })
}))
