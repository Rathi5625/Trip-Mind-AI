import { useQuery } from "@tanstack/react-query"
import { searchDestinations } from "../services/createTrip.service"

export function useDestinationSearch(query: string) {
  return useQuery({
    queryKey: ["destinations", query],
    queryFn: () => searchDestinations(query),
    staleTime: 5000,
  })
}
