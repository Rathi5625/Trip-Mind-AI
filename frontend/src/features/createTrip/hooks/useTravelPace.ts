import { usePreferencesStore } from "../store/preferencesStore"

export function useTravelPace() {
  const travelPace = usePreferencesStore((state) => state.travelPace)
  const setTravelPace = usePreferencesStore((state) => state.setTravelPace)

  return {
    travelPace,
    setTravelPace
  }
}
