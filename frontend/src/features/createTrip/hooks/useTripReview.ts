import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTravelDatesStore } from "../store/travelDatesStore"
import { useTravelersStore } from "../store/travelersStore"
import { useBudgetStore } from "../store/budgetStore"
import { usePreferencesStore } from "../store/preferencesStore"
import { useReviewStore } from "../store/reviewStore"
import { getReviewInsights, generateTripPlanSimulated } from "../services/review.service"
import { DEFAULT_BUDGET_BREAKDOWN } from "../constants/reviewConstants"
import { TripReviewData } from "../types/review"

export function useTripReview() {
  const router = useRouter()

  // Selectors from other stores
  const { destination, selectedRange } = useTravelDatesStore()
  const { groupType, headcount } = useTravelersStore()
  const { sliderValue, currency } = useBudgetStore()
  const { selectedInterests, selectedAccommodation, travelPace } = usePreferencesStore()

  // Selectors from review generation store
  const { isGenerating, progress, error, setGenerating, setProgress, setError } = useReviewStore()

  // Format dates & duration
  const startStr = selectedRange.start ? selectedRange.start.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""
  const endStr = selectedRange.end ? selectedRange.end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""
  const datesFormatted = startStr && endStr ? `${startStr} - ${endStr}` : "Sep 12 - 24, 2024"

  const diffTime = selectedRange.end && selectedRange.start ? Math.abs(selectedRange.end.getTime() - selectedRange.start.getTime()) : 0
  const durationDays = diffTime ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 12
  const durationFormatted = `${durationDays} Days`

  // Format travelers
  const adults = headcount.adults || 1
  const children = headcount.children || 0
  const totalTravelers = adults + children
  const travelersCountFormatted = `${totalTravelers} Traveler${totalTravelers > 1 ? "s" : ""}`
  const travelersTypeFormatted = groupType ? groupType.charAt(0).toUpperCase() + groupType.slice(1) + " Trip" : "Solo Trip"

  // Budget calculations
  const budgetTotal = sliderValue || 3000
  const budgetBreakdown = DEFAULT_BUDGET_BREAKDOWN(budgetTotal)

  // Consolidate data
  const reviewData: TripReviewData = {
    destination: destination || "Amalfi Coast, Italy",
    country: destination.includes(",") ? destination.split(",")[1].trim() : "Italy",
    region: destination.includes(",") ? destination.split(",")[0].trim() : "Campania Region",
    imageUrl: destination.toLowerCase().includes("amalfi")
      ? "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80"
      : destination.toLowerCase().includes("tokyo")
      ? "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80"
      : destination.toLowerCase().includes("paris")
      ? "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
      : "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80",
    dates: datesFormatted,
    duration: durationFormatted,
    travelersCount: travelersCountFormatted,
    travelersType: travelersTypeFormatted,
    accommodation: selectedAccommodation 
      ? selectedAccommodation.charAt(0).toUpperCase() + selectedAccommodation.slice(1) + " Hotels" 
      : "Boutique Hotels",
    pace: travelPace ? travelPace.charAt(0).toUpperCase() + travelPace.slice(1) : "Balanced",
    budgetTotal,
    budgetBreakdown,
    interests: selectedInterests.length > 0 ? selectedInterests : ["culinary", "history", "culture"]
  }

  // React Query for AI insights
  const { data: aiOutlook, isLoading: isInsightsLoading } = useQuery({
    queryKey: ["reviewInsights", reviewData.destination, reviewData.interests, reviewData.dates],
    queryFn: () => getReviewInsights(reviewData.destination, reviewData.interests, reviewData.dates),
    placeholderData: {
      matchScore: 98,
      matchDescription: "Highly aligned to interests",
      weatherForecast: {
        month: "September",
        temp: "23°C",
        condition: "Sunny",
        rainStatus: "Low Rain",
        season: "Perfect Season"
      },
      crowds: "Low tourist crowds",
      readiness: 98,
      confidence: 98,
      warnings: ["Museums are closed on Mondays. We'll automatically adjust your itinerary."],
      estimatedTimeSeconds: 18
    }
  })

  // Handlers
  const handleGeneratePlan = async () => {
    if (isGenerating) return
    setError(null)
    setGenerating(true)
    setProgress(0)

    try {
      await generateTripPlanSimulated((p) => {
        setProgress(p)
      })
      // Navigate to planner generated success screen upon completion
      router.push("/planner/generated")
    } catch (err: any) {
      setError(err?.message || "Something went wrong generating your plan.")
      setGenerating(false)
    }
  }

  return {
    reviewData,
    aiOutlook,
    isInsightsLoading,
    isGenerating,
    progress,
    error,
    handleGeneratePlan
  }
}
