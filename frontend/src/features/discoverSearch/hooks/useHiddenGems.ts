import { useQuery } from "@tanstack/react-query"
import { getHiddenGems } from "../services/search.service"

export function useHiddenGems() {
  const { data: hiddenGems = [], isLoading } = useQuery({
    queryKey: ["searchHiddenGems"],
    queryFn: getHiddenGems
  })

  return {
    hiddenGems,
    isLoading
  }
}
