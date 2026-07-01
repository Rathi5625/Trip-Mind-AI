import { useQuery } from "@tanstack/react-query"
import { getSeasons, getBudgetProfiles } from "../services/destination.service"
import { useDestinationStore } from "../store/destinationStore"

export function useTravelIntelligence() {
  const { selectedSeason, setSelectedSeason } = useDestinationStore()

  const { data: seasons = [], isLoading: isLoadingSeasons } = useQuery({
    queryKey: ["destinationSeasons"],
    queryFn: getSeasons
  })

  const { data: budgets = [], isLoading: isLoadingBudgets } = useQuery({
    queryKey: ["destinationBudgets"],
    queryFn: getBudgetProfiles
  })

  return {
    seasons,
    isLoadingSeasons,
    selectedSeason,
    setSelectedSeason,
    budgets,
    isLoadingBudgets
  }
}
