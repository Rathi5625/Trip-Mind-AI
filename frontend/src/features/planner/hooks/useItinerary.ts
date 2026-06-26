"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { itineraryService } from "../services/itinerary.service"
import { useItineraryStore } from "../store/itineraryStore"

export function useItinerary() {
  const { itineraryData, setItineraryData, activeDayNumber, setActiveDayNumber } = useItineraryStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ["itineraryData"],
    queryFn: itineraryService.getItineraryData,
    enabled: !itineraryData, // Only fetch if we don't have it already in the store
  })

  // Hydrate store when query returns
  useEffect(() => {
    if (data && !itineraryData) {
      setItineraryData(data)
    }
  }, [data, itineraryData, setItineraryData])

  return {
    itineraryData: itineraryData || data || null,
    isLoading: isLoading && !itineraryData,
    error,
    activeDayNumber,
    setActiveDayNumber,
  }
}
