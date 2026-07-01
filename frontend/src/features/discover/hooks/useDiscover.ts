import { useQuery } from "@tanstack/react-query"
import { useDiscoverStore } from "../store/discoverStore"
import { getTrendingThisMonth } from "../services/discover.service"
import { DISCOVER_CATEGORIES } from "../constants/discoverConstants"

export function useDiscover() {
  const {
    activeCategory,
    setActiveCategory,
    isAIChatOpen,
    setAIChatOpen
  } = useDiscoverStore()

  const { data: trendingDestinations = [], isLoading: isTrendingLoading } = useQuery({
    queryKey: ["discoverTrending"],
    queryFn: getTrendingThisMonth
  })

  return {
    categories: DISCOVER_CATEGORIES,
    activeCategory,
    setActiveCategory,
    trendingDestinations,
    isTrendingLoading,
    isAIChatOpen,
    setAIChatOpen
  }
}
