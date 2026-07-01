import { useQuery } from "@tanstack/react-query"
import { getRecommendedDestinations } from "../services/discover.service"
import { useDiscoverStore } from "../store/discoverStore"

export function useRecommendations() {
  const { favorites, toggleFavorite } = useDiscoverStore()

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ["discoverRecommendations"],
    queryFn: getRecommendedDestinations
  })

  // Map favorite statuses dynamically
  const enrichedRecommendations = recommendations.map((dest) => ({
    ...dest,
    isFavorite: favorites.includes(dest.id)
  }))

  return {
    recommendations: enrichedRecommendations,
    isLoading,
    toggleFavorite
  }
}
