import { useTravelersStore } from "../store/travelersStore"

export function useTravelers() {
  const store = useTravelersStore()
  
  const getTotalTravelersCount = (): number => {
    const { adults, children, infants } = store.headcount
    return adults + children + infants
  }

  return {
    ...store,
    getTotalTravelersCount
  }
}
