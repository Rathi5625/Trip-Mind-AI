import { useQuery } from "@tanstack/react-query"
import { useSearchStore } from "../store/searchStore"
import { getSearchDestinations } from "../services/search.service"

export function useSearchResults() {
  const {
    activeSearchQuery,
    sortBy,
    setSortBy,
    activeChips,
    removeChip,
    favorites,
    toggleFavorite
  } = useSearchStore()

  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["searchResults", activeSearchQuery],
    queryFn: () => getSearchDestinations(activeSearchQuery)
  })

  return {
    destinations,
    isLoading,
    activeSearchQuery,
    sortBy,
    setSortBy,
    activeChips,
    removeChip,
    favorites,
    toggleFavorite
  }
}
