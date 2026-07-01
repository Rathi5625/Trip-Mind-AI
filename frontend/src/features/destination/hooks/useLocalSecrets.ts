import { useQuery } from "@tanstack/react-query"
import { getLocalSecrets, getSavingTips, getSimilarDestinations } from "../services/destination.service"

export function useLocalSecrets() {
  const { data: secrets = [], isLoading: isLoadingSecrets } = useQuery({
    queryKey: ["destinationSecrets"],
    queryFn: getLocalSecrets
  })

  const { data: savings = [], isLoading: isLoadingSavings } = useQuery({
    queryKey: ["destinationSavings"],
    queryFn: getSavingTips
  })

  const { data: similar = [], isLoading: isLoadingSimilar } = useQuery({
    queryKey: ["destinationSimilar"],
    queryFn: getSimilarDestinations
  })

  return {
    secrets,
    isLoadingSecrets,
    savings,
    isLoadingSavings,
    similar,
    isLoadingSimilar
  }
}
