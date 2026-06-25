"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "../store/onboardingStore"
import { TRAVELER_TYPES } from "../constants/travelerTypes"

export function useTravelerType() {
  const router = useRouter()
  const selectedTypes = useOnboardingStore((state) => state.selectedTravelerTypes)
  const toggleType = useOnboardingStore((state) => state.toggleTravelerType)
  const clearTypes = useOnboardingStore((state) => state.clearTravelerTypes)

  const toggleTravelerType = (id: string) => {
    toggleType(id)
  }

  const selectedNames = React.useMemo(() => {
    return TRAVELER_TYPES.filter((type) => selectedTypes.includes(type.id))
      .map((type) => type.title)
      .join(", ")
  }, [selectedTypes])

  const isValid = selectedTypes.length > 0

  const handleNext = () => {
    if (!isValid) return
    router.push("/onboarding/preferences") // Navigates to Step 3
  }

  const handleBack = () => {
    router.push("/onboarding") // Navigate back to Step 1 (Welcome)
  }

  return {
    selectedTypes,
    toggleTravelerType,
    selectedNames,
    isValid,
    handleNext,
    handleBack,
    clearTypes,
  }
}
