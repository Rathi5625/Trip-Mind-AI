import { useQuery } from "@tanstack/react-query"
import { usePreferencesStore } from "../store/preferencesStore"
import { getPreferenceInsights } from "../services/preferences.service"

export function usePreferences() {
  const selectedInterests = usePreferencesStore((state) => state.selectedInterests)
  const toggleInterest = usePreferencesStore((state) => state.toggleInterest)
  const setSelectedInterests = usePreferencesStore((state) => state.setSelectedInterests)
  const selectedAccommodation = usePreferencesStore((state) => state.selectedAccommodation)
  const setSelectedAccommodation = usePreferencesStore((state) => state.setSelectedAccommodation)
  const travelPace = usePreferencesStore((state) => state.travelPace)
  const setTravelPace = usePreferencesStore((state) => state.setTravelPace)

  const { data: insightsData, isLoading } = useQuery({
    queryKey: ["preferenceInsights", selectedInterests, selectedAccommodation, travelPace],
    queryFn: () => getPreferenceInsights(selectedInterests, selectedAccommodation, travelPace),
    placeholderData: (previousData) => previousData
  })

  return {
    selectedInterests,
    toggleInterest,
    setSelectedInterests,
    selectedAccommodation,
    setSelectedAccommodation,
    travelPace,
    setTravelPace,
    insightsData,
    isLoading
  }
}
