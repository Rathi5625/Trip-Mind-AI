import { usePreferencesStore } from "../store/preferencesStore"

export function useAccommodation() {
  const selectedAccommodation = usePreferencesStore((state) => state.selectedAccommodation)
  const setSelectedAccommodation = usePreferencesStore((state) => state.setSelectedAccommodation)

  return {
    selectedAccommodation,
    setSelectedAccommodation
  }
}
