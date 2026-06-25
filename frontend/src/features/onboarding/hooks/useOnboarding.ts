"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { OnboardingState } from "../types/onboarding"

export function useOnboarding() {
  const router = useRouter()
  const [state, setState] = React.useState<OnboardingState>({
    currentStep: 1,
    totalSteps: 5,
  })

  // Ordered route map for each step
  const STEP_ROUTES: Record<number, string> = {
    1: "/onboarding",
    2: "/onboarding/traveler-type",
    3: "/onboarding/preferences",
    4: "/onboarding/destinations",
    5: "/onboarding/personalize",
  }

  const nextStep = () => {
    setState((prev) => {
      const next = prev.currentStep + 1
      if (next > prev.totalSteps) {
        router.push("/dashboard")
        return prev
      }
      // Navigate to the next step route
      router.push(STEP_ROUTES[next])
      return { ...prev, currentStep: next }
    })
  }

  const prevStep = () => {
    setState((prev) => {
      if (prev.currentStep <= 1) return prev
      const prev2 = prev.currentStep - 1
      router.push(STEP_ROUTES[prev2])
      return { ...prev, currentStep: prev2 }
    })
  }

  const setStep = (step: number) => {
    setState((prev) => {
      if (step < 1 || step > prev.totalSteps) return prev
      router.push(STEP_ROUTES[step])
      return { ...prev, currentStep: step }
    })
  }

  const progressPercent = (state.currentStep / state.totalSteps) * 100

  return {
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    nextStep,
    prevStep,
    setStep,
    progressPercent,
  }
}
