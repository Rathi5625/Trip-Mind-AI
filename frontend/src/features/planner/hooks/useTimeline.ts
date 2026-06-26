"use client"

import { useItineraryStore } from "../store/itineraryStore"

export function useTimeline() {
  const { activeDayNumber, setActiveDayNumber } = useItineraryStore()

  const selectDay = (dayNum: number) => {
    setActiveDayNumber(dayNum)
    
    // Smooth scroll to corresponding Day section
    const element = document.getElementById(`day-section-${dayNum}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return {
    activeDayNumber,
    selectDay,
  }
}
