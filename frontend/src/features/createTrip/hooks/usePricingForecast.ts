import { useQuery } from "@tanstack/react-query"
import { getDatesInsights } from "../services/dates.service"
import { useTravelDatesStore } from "../store/travelDatesStore"

export function usePricingForecast() {
  const { destination, selectedRange } = useTravelDatesStore()
  const { start, end } = selectedRange

  return useQuery({
    queryKey: ["datesInsights", destination, start?.toISOString(), end?.toISOString()],
    queryFn: () => getDatesInsights(destination, start, end),
    staleTime: 2000,
  })
}
