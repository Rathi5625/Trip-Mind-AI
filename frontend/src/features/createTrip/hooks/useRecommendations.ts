import { useMutation } from "@tanstack/react-query"
import { getSurpriseDestination } from "../services/createTrip.service"
import { useTripWizardStore } from "../store/tripWizardStore"
import { WizardStep } from "../types/createTrip"

export function useRecommendations() {
  const setSelectedDestination = useTripWizardStore((state) => state.setSelectedDestination)
  const setStep = useTripWizardStore((state) => state.setStep)
  const setSearching = useTripWizardStore((state) => state.setSearching)

  const surpriseMutation = useMutation({
    mutationFn: getSurpriseDestination,
    onMutate: () => {
      setSearching(true)
    },
    onSuccess: (destination) => {
      setSelectedDestination(destination)
      setStep(2) // Move to Step 2
    },
    onSettled: () => {
      setSearching(false)
    }
  })

  return {
    triggerSurprise: () => surpriseMutation.mutate(),
    isLoading: surpriseMutation.isPending,
  }
}
