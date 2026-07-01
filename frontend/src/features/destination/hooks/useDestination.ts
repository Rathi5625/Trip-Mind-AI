import { useQuery } from "@tanstack/react-query"
import { getDestinationById } from "../services/destination.service"
import { useDestinationStore } from "../store/destinationStore"

export function useDestination(id: string) {
  const { isSaved, toggleSaved, selectedBudgetStyle, setSelectedBudgetStyle } = useDestinationStore()

  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id)
  })

  return {
    destination,
    isLoading,
    isSaved,
    toggleSaved,
    selectedBudgetStyle,
    setSelectedBudgetStyle
  }
}
