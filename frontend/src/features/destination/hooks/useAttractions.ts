import { useQuery } from "@tanstack/react-query"
import { getAttractions } from "../services/destination.service"

export function useAttractions() {
  const { data: attractions = [], isLoading } = useQuery({
    queryKey: ["destinationAttractions"],
    queryFn: getAttractions
  })

  return {
    attractions,
    isLoading
  }
}
