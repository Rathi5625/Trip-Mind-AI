"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "../store/onboardingStore"
import { TRAVELER_TYPES } from "../constants/travelerTypes"
import { BUDGET_OPTIONS, DURATION_OPTIONS, GROUP_OPTIONS, PACE_OPTIONS } from "../constants/preferenceOptions"
import { DEFAULT_DESTINATIONS } from "../constants/destinations"

export function useOnboardingCompletion() {
  const router = useRouter()
  const store = useOnboardingStore()

  const [isLoading, setIsLoading] = React.useState(true)
  const [animationPhase, setAnimationPhase] = React.useState<"loading" | "reveal" | "complete">("loading")

  React.useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
      setAnimationPhase("reveal")
    }, 2200)
    const completeTimer = setTimeout(() => {
      setAnimationPhase("complete")
    }, 3000)
    return () => {
      clearTimeout(loadTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  const travelerTypeLabels = React.useMemo(() => {
    if (store.selectedTravelerTypes.length === 0) return ["Explorer"]
    return store.selectedTravelerTypes.map(
      (id) => TRAVELER_TYPES.find((t) => t.id === id)?.title ?? id
    )
  }, [store.selectedTravelerTypes])

  const travelerTypeEmojis = React.useMemo(() => {
    return store.selectedTravelerTypes.map(
      (id) => TRAVELER_TYPES.find((t) => t.id === id)?.emoji ?? "✈️"
    )
  }, [store.selectedTravelerTypes])

  const budgetLabel = React.useMemo(() => {
    if (!store.budget) return "Not set"
    return BUDGET_OPTIONS.find((o) => o.id === store.budget)?.title ?? store.budget
  }, [store.budget])

  const budgetRange = React.useMemo(() => {
    if (!store.budget) return ""
    return BUDGET_OPTIONS.find((o) => o.id === store.budget)?.priceRange ?? ""
  }, [store.budget])

  const durationLabel = React.useMemo(() => {
    if (!store.duration) return "Flexible"
    return DURATION_OPTIONS.find((o) => o.id === store.duration)?.label ?? store.duration
  }, [store.duration])

  const groupLabel = React.useMemo(() => {
    if (!store.group) return "Solo"
    return GROUP_OPTIONS.find((o) => o.id === store.group)?.label ?? store.group
  }, [store.group])

  const paceLabel = React.useMemo(() => {
    if (!store.pace) return "Balanced"
    return PACE_OPTIONS.find((o) => o.id === store.pace)?.label ?? store.pace
  }, [store.pace])

  const selectedDestinationsData = React.useMemo(() => {
    return store.selectedDestinations.map((id) => {
      const match = DEFAULT_DESTINATIONS.find((d) => d.id === id)
      if (match) return match
      return {
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        flag: "📍",
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        bestSeason: "Year-Round",
        averageBudget: "₹70K",
        averageBudgetValue: 70000,
        rating: 4.5,
        aiMatch: 85,
        categories: ["all"] as string[],
      }
    })
  }, [store.selectedDestinations])

  const estimatedBudget = React.useMemo(() => {
    let base = 70000
    if (store.budget === "budget") base = 35000
    else if (store.budget === "comfort") base = 82000
    else if (store.budget === "premium") base = 210000
    else if (store.budget === "luxury") base = 450000
    let durMult = 1.0
    if (store.duration === "weekend") durMult = 0.4
    else if (store.duration === "1-week") durMult = 1.0
    else if (store.duration === "2-weeks") durMult = 1.9
    else if (store.duration === "1-month") durMult = 3.8
    let grpMult = 1.0
    if (store.group === "solo") grpMult = 0.6
    else if (store.group === "couple") grpMult = 1.0
    else if (store.group === "friends") grpMult = 1.8
    else if (store.group === "family") grpMult = 2.4
    const destCount = Math.max(store.selectedDestinations.length, 1)
    const total = Math.round(base * durMult * grpMult * (1 + (destCount - 1) * 0.3))
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(total)
  }, [store.budget, store.duration, store.group, store.selectedDestinations])

  const aiConfidence = React.useMemo(() => {
    let score = 55
    if (store.selectedTravelerTypes.length > 0) score += 10
    if (store.selectedTravelerTypes.length > 1) score += 5
    if (store.budget) score += 7
    if (store.duration) score += 7
    if (store.group) score += 5
    if (store.pace) score += 4
    if (store.selectedDestinations.length > 0) score += 5
    if (store.selectedDestinations.length > 2) score += 2
    return Math.min(score, 97)
  }, [store])

  const focusAreas = React.useMemo(() => {
    const areas: string[] = []
    store.selectedTravelerTypes.forEach((id) => {
      if (id === "backpacker") areas.push("Budget Stays", "Hostel Culture", "Local Transport")
      if (id === "beach-lover") areas.push("Beach Resorts", "Water Sports", "Coastal Dining")
      if (id === "city-explorer") areas.push("Urban Culture", "Museum Hopping", "Nightlife")
      if (id === "food-enthusiast") areas.push("Street Food", "Fine Dining", "Cooking Classes")
      if (id === "adventure-seeker") areas.push("Hiking Trails", "Extreme Sports", "Photography")
      if (id === "nature-traveler") areas.push("Wildlife Safaris", "Scenic Viewpoints", "Eco Stays")
      if (id === "luxury-traveler") areas.push("5-Star Hotels", "Private Tours", "Spa & Wellness")
      if (id === "business-traveler") areas.push("Business Hotels", "Conference Venues", "Fast Transfers")
    })
    const unique = Array.from(new Set(areas))
    return unique.length > 0 ? unique.slice(0, 4) : ["Local Experiences", "Scenic Photography", "Cultural Immersion", "Adventure Activities"]
  }, [store.selectedTravelerTypes])

  // --- Travel DNA scores ---
  const explorerScore = React.useMemo(() => {
    let score = 60
    if (store.selectedTravelerTypes.length > 0) score += 12
    if (store.selectedTravelerTypes.length > 1) score += 8
    if (store.budget) score += 5
    if (store.duration) score += 5
    if (store.group) score += 4
    if (store.pace) score += 3
    if (store.selectedDestinations.length > 0) score += 4
    return Math.min(score, 97)
  }, [store])

  const dnaDimensions = React.useMemo(() => {
    const types = store.selectedTravelerTypes
    const has = (id: string) => types.includes(id)
    let adventure = 40, food = 35, luxury = 30, culture = 45, nature = 38
    if (has("adventure-seeker")) adventure += 52
    if (has("backpacker")) adventure += 30
    if (has("nature-traveler")) adventure += 20
    if (has("beach-lover")) adventure += 18
    if (has("city-explorer")) adventure += 12
    if (has("food-enthusiast")) food += 54
    if (has("city-explorer")) food += 22
    if (has("luxury-traveler")) food += 18
    if (has("backpacker")) food += 12
    if (has("beach-lover")) food += 8
    if (has("luxury-traveler")) luxury += 55
    if (has("business-traveler")) luxury += 30
    if (has("beach-lover")) luxury += 15
    if (has("city-explorer")) luxury += 10
    if (has("backpacker")) luxury -= 10
    if (has("city-explorer")) culture += 50
    if (has("food-enthusiast")) culture += 28
    if (has("luxury-traveler")) culture += 18
    if (has("backpacker")) culture += 15
    if (has("adventure-seeker")) culture += 8
    if (has("nature-traveler")) nature += 55
    if (has("adventure-seeker")) nature += 30
    if (has("backpacker")) nature += 20
    if (has("beach-lover")) nature += 22
    if (store.budget === "luxury") { luxury += 15; adventure -= 5 }
    if (store.budget === "budget") { luxury -= 15; adventure += 10 }
    return [
      { label: "Adventure", score: Math.min(Math.max(adventure, 20), 97), color: "#f97316", bgColor: "#fff7ed", emoji: "🏔️" },
      { label: "Food", score: Math.min(Math.max(food, 20), 97), color: "#10b981", bgColor: "#ecfdf5", emoji: "🍜" },
      { label: "Luxury", score: Math.min(Math.max(luxury, 10), 97), color: "#8b5cf6", bgColor: "#f5f3ff", emoji: "✨" },
      { label: "Culture", score: Math.min(Math.max(culture, 25), 97), color: "#3b82f6", bgColor: "#eff6ff", emoji: "🏛️" },
      { label: "Nature", score: Math.min(Math.max(nature, 20), 97), color: "#22c55e", bgColor: "#f0fdf4", emoji: "🌿" },
    ]
  }, [store.selectedTravelerTypes, store.budget])

  // --- First trip preview ---
  const firstTrip = React.useMemo(() => {
    const topDest = (() => {
      if (store.selectedDestinations.length > 0) {
        const match = DEFAULT_DESTINATIONS.find((d) => d.id === store.selectedDestinations[0])
        if (match) return match
      }
      return [...DEFAULT_DESTINATIONS].sort((a, b) => b.aiMatch - a.aiMatch)[0]
    })()
    let days = 7
    if (store.duration === "weekend") days = 3
    else if (store.duration === "1-week") days = 7
    else if (store.duration === "2-weeks") days = 14
    else if (store.duration === "1-month") days = 28
    let base = 70000
    if (store.budget === "budget") base = 35000
    else if (store.budget === "comfort") base = 82000
    else if (store.budget === "premium") base = 210000
    else if (store.budget === "luxury") base = 450000
    let grpMult = 1.0
    if (store.group === "solo") grpMult = 0.6
    else if (store.group === "couple") grpMult = 1.0
    else if (store.group === "friends") grpMult = 1.8
    else if (store.group === "family") grpMult = 2.4
    const tripBudget = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(base * grpMult))
    const seasonToMonth: Record<string, string> = {
      "March-May": "April", "June-August": "July", "Sept-March": "November",
      "Nov-March": "December", "April-October": "June", "April-June": "May",
      "Nov-Feb": "January", "May-Sept": "June", "Feb-April": "March",
      "Nov-April": "February", "Sept-Nov": "October", "Dec-Feb": "January",
      "Year-Round": "Any Month",
    }
    const normalSeason = topDest.bestSeason.replace(/\u2013/g, "-")
    const bestTime = seasonToMonth[normalSeason] ?? normalSeason.split("-")[0]
    const weatherMap: Record<string, string> = {
      japan: "15°C–22°C", switzerland: "12°C–24°C", bali: "26°C–32°C",
      iceland: "-2°C–8°C", dubai: "20°C–30°C", paris: "14°C–22°C",
      thailand: "24°C–34°C", italy: "18°C–28°C", singapore: "25°C–32°C",
      maldives: "26°C–30°C", "south-korea": "10°C–20°C", "new-zealand": "15°C–25°C",
    }
    const weatherRange = weatherMap[topDest.id] ?? "18°C–26°C"
    return {
      label: `${days} Days in ${topDest.name}`,
      estimatedBudget: tripBudget,
      bestTime,
      weatherRange,
      confidence: Math.min(topDest.aiMatch + 2, 99),
      flag: topDest.flag,
    }
  }, [store.selectedDestinations, store.budget, store.duration, store.group])

  const handleGoToDashboard = () => router.push("/dashboard")
  const handleEditProfile = () => router.push("/onboarding")

  return {
    isLoading, animationPhase,
    travelerTypeLabels, travelerTypeEmojis,
    budgetLabel, budgetRange, durationLabel, groupLabel, paceLabel,
    selectedDestinationsData, estimatedBudget, aiConfidence, focusAreas,
    explorerScore, dnaDimensions, firstTrip,
    handleGoToDashboard, handleEditProfile,
  }
}
