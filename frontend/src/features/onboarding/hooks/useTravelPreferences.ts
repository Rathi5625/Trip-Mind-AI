"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useOnboardingStore } from "../store/onboardingStore"
import { BudgetType, DurationType, GroupType, PaceType, TravelPreferences } from "../types/preferences"

const preferencesSchema = z.object({
  budget: z.enum(["budget", "comfort", "premium", "luxury"] as const, {
    message: "Please select a travel budget.",
  }),
  duration: z.enum(["weekend", "1-week", "2-weeks", "1-month"] as const, {
    message: "Please select a trip duration.",
  }),
  group: z.enum(["solo", "couple", "friends", "family"] as const, {
    message: "Please select a travel group.",
  }),
  pace: z.enum(["relaxed", "balanced", "fast-paced"] as const, {
    message: "Please select a travel pace.",
  }),
})

type PreferencesFormValues = z.infer<typeof preferencesSchema>

export function useTravelPreferences() {
  const router = useRouter()
  const store = useOnboardingStore()

  // Initialize React Hook Form with default values from Zustand store
  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      budget: (store.budget as BudgetType) || undefined,
      duration: (store.duration as DurationType) || undefined,
      group: (store.group as GroupType) || undefined,
      pace: (store.pace as PaceType) || undefined,
    },
    mode: "onChange",
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = form

  // Watch fields in real-time to update the AI Preview panel
  const budgetValue = watch("budget")
  const durationValue = watch("duration")
  const groupValue = watch("group")
  const paceValue = watch("pace")

  // Generate live preference summary text
  const selectedSummary = React.useMemo(() => {
    const parts: string[] = []
    if (budgetValue) {
      const bMap = { budget: "Budget", comfort: "Comfort", premium: "Premium", luxury: "Luxury" }
      parts.push(bMap[budgetValue])
    }
    if (durationValue) {
      const dMap = { weekend: "Weekend", "1-week": "1 Wk", "2-weeks": "2 Wks", "1-month": "1 Mo+" }
      parts.push(dMap[durationValue])
    }
    if (groupValue) {
      const gMap = { solo: "Solo", couple: "Couple", friends: "Friends", family: "Family" }
      parts.push(gMap[groupValue])
    }
    if (paceValue) {
      const pMap = { relaxed: "Relaxed", balanced: "Balanced", "fast-paced": "Fast-Paced" }
      parts.push(pMap[paceValue])
    }
    return parts.join(" • ")
  }, [budgetValue, durationValue, groupValue, paceValue])

  // Custom setters to trigger form validations
  const setPreferenceValue = (name: keyof PreferencesFormValues, val: any) => {
    setValue(name, val, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = (values: PreferencesFormValues) => {
    // Save to persisted Zustand store
    store.setBudget(values.budget)
    store.setDuration(values.duration)
    store.setGroup(values.group)
    store.setPace(values.pace)

    // Redirect to Step 4 (e.g. destinations selection page)
    router.push("/onboarding/destinations")
  }

  const handleBack = () => {
    // Optionally save current form progress before going back
    const currentValues = form.getValues()
    if (currentValues.budget) store.setBudget(currentValues.budget)
    if (currentValues.duration) store.setDuration(currentValues.duration)
    if (currentValues.group) store.setGroup(currentValues.group)
    if (currentValues.pace) store.setPace(currentValues.pace)

    router.push("/onboarding/traveler-type")
  }

  return {
    form,
    budgetValue: budgetValue || null,
    durationValue: durationValue || null,
    groupValue: groupValue || null,
    paceValue: paceValue || null,
    selectedSummary,
    isValid,
    setPreferenceValue,
    handleSubmit: handleSubmit(onSubmit),
    handleBack,
  }
}
