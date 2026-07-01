import { useQuery } from "@tanstack/react-query"
import { getComparisonData } from "../services/search.service"

export function useComparison() {
  const { data: comparisonCities = [], isLoading } = useQuery({
    queryKey: ["searchComparison"],
    queryFn: getComparisonData
  })

  return {
    comparisonCities,
    isLoading
  }
}
