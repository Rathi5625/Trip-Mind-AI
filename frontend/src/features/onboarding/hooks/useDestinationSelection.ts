"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useOnboardingStore } from "../store/onboardingStore"
import { DEFAULT_DESTINATIONS } from "../constants/destinations"
import { Destination } from "../types/destination"
import { CategoryId } from "../components/CategoryFilters"

export function useDestinationSelection() {
  const router = useRouter()
  const store = useOnboardingStore()

  const selectedDestinations = store.selectedDestinations
  const toggleDestination = store.toggleDestination
  const selectedTravelerTypes = store.selectedTravelerTypes

  const [query, setQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<CategoryId>("all")
  const [customDestinations, setCustomDestinations] = React.useState<Destination[]>([])

  // Combine default destinations and custom added ones
  const allDestinations = React.useMemo(() => {
    return [...DEFAULT_DESTINATIONS, ...customDestinations]
  }, [customDestinations])

  // Compute top 3 AI Recommendations based on Traveler Type
  const recommendations = React.useMemo(() => {
    if (selectedTravelerTypes.length === 0) {
      // Default top 3 fallback
      return DEFAULT_DESTINATIONS.filter((d) => 
        ["japan", "switzerland", "italy"].includes(d.id)
      ).sort((a, b) => b.aiMatch - a.aiMatch)
    }

    // Score destinations based on selected traveler types
    const scored = DEFAULT_DESTINATIONS.map((dest) => {
      let score = 0
      
      selectedTravelerTypes.forEach((typeId) => {
        if (typeId === "backpacker" && dest.categories.includes("backpacking")) score += 3
        if (typeId === "beach-lover" && dest.categories.includes("beaches")) score += 3
        if (typeId === "city-explorer" && dest.categories.includes("cities")) score += 3
        if (typeId === "food-enthusiast" && dest.categories.includes("food")) score += 3
        if (typeId === "adventure-seeker" && (dest.categories.includes("mountains") || dest.categories.includes("nature"))) score += 2
        if (typeId === "nature-traveler" && dest.categories.includes("nature")) score += 3
        if (typeId === "luxury-traveler" && dest.categories.includes("luxury")) score += 3
      })

      // Use the baseline AI Match score as a secondary ranking factor
      score += dest.aiMatch / 100

      return { dest, score }
    })

    // Sort by score descending and take the top 3
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.dest)
  }, [selectedTravelerTypes])

  // Filter list based on category AND search query
  const filteredDestinations = React.useMemo(() => {
    let result = allDestinations

    // 1. Filter by category first
    if (activeCategory !== "all") {
      result = result.filter((dest) => dest.categories?.includes(activeCategory))
    }

    // 2. Filter by search query
    const q = query.trim().toLowerCase()
    if (!q) return result

    return result.filter((dest) =>
      dest.name.toLowerCase().includes(q)
    )
  }, [allDestinations, activeCategory, query])

  // Check if query exactly matches any visible destinations
  const hasExactMatch = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return allDestinations.some((dest) => dest.name.toLowerCase() === q)
  }, [allDestinations, query])

  // Add custom wishlist country
  const handleAddCustomDestination = (name: string) => {
    const cleanName = name.trim()
    const id = cleanName.toLowerCase()

    // Prevent duplicates
    if (allDestinations.some((d) => d.id === id)) {
      if (!selectedDestinations.includes(id)) {
        toggleDestination(id)
      }
      return
    }

    const newDest: Destination = {
      id,
      name: cleanName,
      flag: "📍",
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
      bestSeason: "Year-Round",
      averageBudget: "₹70K",
      averageBudgetValue: 70000,
      rating: 4.5,
      aiMatch: 85,
      categories: ["all"],
    }

    setCustomDestinations((prev) => [...prev, newDest])
    
    // Automatically select it
    toggleDestination(id)
  }

  // Get full objects of selected destinations for summary wishlist chips
  const selectedDestinationsData = React.useMemo(() => {
    return selectedDestinations.map((id) => {
      const match = allDestinations.find((d) => d.id === id)
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
        categories: ["all"],
      }
    })
  }, [selectedDestinations, allDestinations])

  const isValid = selectedDestinations.length > 0

  const handleNext = () => {
    if (!isValid) return
    router.push("/onboarding/personalize") // Route to Step 5 (AI Personalization final step)
  }

  const handleBack = () => {
    router.push("/onboarding/preferences") // Route back to Step 3
  }

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    recommendations,
    filteredDestinations,
    hasExactMatch,
    selectedDestinations,
    selectedDestinationsData,
    toggleDestination,
    handleAddCustomDestination,
    isValid,
    handleNext,
    handleBack,
  }
}
