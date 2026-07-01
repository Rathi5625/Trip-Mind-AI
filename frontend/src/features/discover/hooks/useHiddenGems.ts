import { useQuery } from "@tanstack/react-query"
import { getHiddenGems } from "../services/discover.service"
import { useDiscoverStore } from "../store/discoverStore"

export function useHiddenGems() {
  const { bookmarks, toggleBookmark } = useDiscoverStore()

  const { data: hiddenGems = [], isLoading } = useQuery({
    queryKey: ["discoverHiddenGems"],
    queryFn: getHiddenGems
  })

  // Map bookmark statuses dynamically
  const enrichedHiddenGems = hiddenGems.map((gem) => ({
    ...gem,
    isBookmarked: bookmarks.includes(gem.id)
  }))

  return {
    hiddenGems: enrichedHiddenGems,
    isLoading,
    toggleBookmark
  }
}
