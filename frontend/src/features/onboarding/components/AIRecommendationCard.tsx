"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Brain, Check } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { useOnboardingStore } from "../store/onboardingStore"
import { TRAVELER_TYPES } from "../constants/travelerTypes"
import { BUDGET_OPTIONS, DURATION_OPTIONS, GROUP_OPTIONS, PACE_OPTIONS } from "../constants/preferenceOptions"
import { BudgetType, DurationType, GroupType, PaceType } from "../types/preferences"
import { DEFAULT_DESTINATIONS } from "../constants/destinations"

interface AIRecommendationCardProps {
  variant?: "preferences" | "destinations"
  // For preferences variant
  budget?: BudgetType | null
  duration?: DurationType | null
  group?: GroupType | null
  pace?: PaceType | null
}

interface Destination {
  name: string
  flag: string
}

// Map traveler types to suggested destinations (used in preferences mode)
const DESTINATION_MAP: Record<string, Destination[]> = {
  backpacker: [
    { name: "Cusco", flag: "🇵🇪" },
    { name: "Pai", flag: "🇹🇭" },
    { name: "Hanoi", flag: "🇻🇳" },
  ],
  "beach-lover": [
    { name: "Amalfi Coast", flag: "🇮🇹" },
    { name: "Bali", flag: "🇮🇩" },
    { name: "Santorini", flag: "🇬🇷" },
  ],
  "city-explorer": [
    { name: "Kyoto", flag: "🇯🇵" },
    { name: "Tokyo", flag: "🇯🇵" },
    { name: "Paris", flag: "🇫🇷" },
  ],
  "food-enthusiast": [
    { name: "Osaka", flag: "🇯🇵" },
    { name: "Rome", flag: "🇮🇹" },
    { name: "Bangkok", flag: "🇹🇭" },
  ],
  "adventure-seeker": [
    { name: "Queenstown", flag: "🇳🇿" },
    { name: "Reykjavík", flag: "🇮🇸" },
    { name: "Interlaken", flag: "🇨🇭" },
  ],
  "nature-traveler": [
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Banff", flag: "🇨🇦" },
    { name: "Patagonia", flag: "🇦🇷" },
  ],
  "business-traveler": [
    { name: "Singapore", flag: "🇸🇬" },
    { name: "London", flag: "🇬🇧" },
    { name: "San Francisco", flag: "🇺🇸" },
  ],
  "luxury-traveler": [
    { name: "Santorini", flag: "🇬🇷" },
    { name: "Dubai", flag: "🇦🇪" },
    { name: "St. Moritz", flag: "🇨🇭" },
  ],
}

export function AIRecommendationCard({
  variant = "preferences",
  budget = null,
  duration = null,
  group = null,
  pace = null,
}: AIRecommendationCardProps) {
  const store = useOnboardingStore()
  const selectedTravelerTypes = store.selectedTravelerTypes
  const selectedDestinations = store.selectedDestinations

  // ==========================================
  // 1. DATA COMPUTATION FOR "preferences" VARIANT
  // ==========================================
  const travelerTypeLabel = React.useMemo(() => {
    if (selectedTravelerTypes.length === 0) return null
    return selectedTravelerTypes
      .map((id) => TRAVELER_TYPES.find((t) => t.id === id)?.title || id)
      .join(", ")
  }, [selectedTravelerTypes])

  const budgetLabel = React.useMemo(() => {
    if (!budget) return null
    return BUDGET_OPTIONS.find((o) => o.id === budget)?.title || null
  }, [budget])

  const durationLabel = React.useMemo(() => {
    if (!duration) return null
    return DURATION_OPTIONS.find((o) => o.id === duration)?.label || null
  }, [duration])

  const groupLabel = React.useMemo(() => {
    if (!group) return null
    return GROUP_OPTIONS.find((o) => o.id === group)?.label || null
  }, [group])

  const paceLabel = React.useMemo(() => {
    if (!pace) return null
    return PACE_OPTIONS.find((o) => o.id === pace)?.label || null
  }, [pace])

  const suggestedDestinations = React.useMemo(() => {
    const defaultDests: Destination[] = [
      { name: "Amalfi Coast", flag: "🇮🇹" },
      { name: "Kyoto", flag: "🇯🇵" },
      { name: "Bali", flag: "🇮🇩" },
    ]

    if (selectedTravelerTypes.length === 0) {
      return defaultDests
    }

    const combined: Destination[] = []
    selectedTravelerTypes.forEach((id) => {
      const match = DESTINATION_MAP[id]
      if (match) {
        combined.push(...match)
      }
    })

    const unique = combined.filter(
      (dest, index, self) => self.findIndex((d) => d.name === dest.name) === index
    )

    if (unique.length > 0) {
      const result = unique.slice(0, 3)
      while (result.length < 3) {
        const fallback = defaultDests.find((d) => !result.some((r) => r.name === d.name))
        if (fallback) result.push(fallback)
        else break
      }
      return result
    }

    return defaultDests
  }, [selectedTravelerTypes])

  const estimatedBudget = React.useMemo(() => {
    if (!budget) return null

    let baseVal = 82000
    if (budget === "budget") baseVal = 32000
    else if (budget === "comfort") baseVal = 82000
    else if (budget === "premium") baseVal = 210000
    else if (budget === "luxury") baseVal = 450000

    let durationMult = 1.0
    if (duration === "weekend") durationMult = 0.4
    else if (duration === "1-week") durationMult = 1.0
    else if (duration === "2-weeks") durationMult = 1.9
    else if (duration === "1-month") durationMult = 3.8

    let groupMult = 1.0
    if (group === "solo") groupMult = 0.6
    else if (group === "couple") groupMult = 1.0
    else if (group === "friends") groupMult = 1.8
    else if (group === "family") groupMult = 2.4

    const total = Math.round(baseVal * durationMult * groupMult)

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(total)
  }, [budget, duration, group])

  const preferencesConfidence = React.useMemo(() => {
    let score = 66
    if (selectedTravelerTypes.length > 0) score += 5
    if (budget) score += 5
    if (duration) score += 5
    if (group) score += 5
    if (pace) score += 5
    return score
  }, [selectedTravelerTypes, budget, duration, group, pace])

  // ==========================================
  // 2. DATA COMPUTATION FOR "destinations" VARIANT
  // ==========================================
  const travelerText = React.useMemo(() => {
    if (selectedTravelerTypes.length === 0) return "Explorer"
    const travelerTypeMap: Record<string, string> = {
      "backpacker": "Backpacker",
      "beach-lover": "Beach Lover",
      "city-explorer": "City Explorer",
      "food-enthusiast": "Food Explorer",
      "adventure-seeker": "Adventure Seeker",
      "nature-traveler": "Nature Explorer",
      "business-traveler": "Business Traveler",
      "luxury-traveler": "Luxury Traveler",
    }
    return selectedTravelerTypes
      .map((id) => travelerTypeMap[id] || TRAVELER_TYPES.find((t) => t.id === id)?.title || id)
      .join(" & ")
  }, [selectedTravelerTypes])

  const destinationsConfidence = React.useMemo(() => {
    if (selectedDestinations.length === 0) return 70
    return Math.min(80 + selectedDestinations.length * 5, 97)
  }, [selectedDestinations])

  const chosenDestinationsList = React.useMemo(() => {
    const list: Destination[] = []
    
    selectedDestinations.forEach((id) => {
      const match = DEFAULT_DESTINATIONS.find((d) => d.id === id)
      if (match) {
        list.push({ name: match.name, flag: match.flag })
      } else {
        const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji}/gu
        const emojis = id.match(emojiRegex)
        const nameOnly = id.replace(emojiRegex, "").trim()
        list.push({
          name: nameOnly.charAt(0).toUpperCase() + nameOnly.slice(1),
          flag: emojis ? emojis[0] : "📍",
        })
      }
    })

    if (list.length === 0) {
      return [
        { name: "Japan", flag: "🇯🇵" },
        { name: "Italy", flag: "🇮🇹" },
        { name: "Thailand", flag: "🇹🇭" },
      ]
    }
    return list
  }, [selectedDestinations])

  const destinationsEstimatedBudget = React.useMemo(() => {
    if (selectedDestinations.length === 0) return "—"
    
    let totalBudget = 0
    selectedDestinations.forEach((id) => {
      const match = DEFAULT_DESTINATIONS.find((d) => d.id === id)
      if (match) {
        totalBudget += match.averageBudgetValue
      } else {
        totalBudget += 70000 // custom destination default
      }
    })

    // Apply multipliers from store settings if available
    let durationMult = 1.0
    if (store.duration === "weekend") durationMult = 0.5
    else if (store.duration === "1-week") durationMult = 1.0
    else if (store.duration === "2-weeks") durationMult = 1.8
    else if (store.duration === "1-month") durationMult = 3.5

    let groupMult = 1.0
    if (store.group === "solo") groupMult = 0.8
    else if (store.group === "couple") groupMult = 1.0
    else if (store.group === "friends") groupMult = 1.8
    else if (store.group === "family") groupMult = 2.5

    const finalBudget = Math.round(totalBudget * 0.7 * durationMult * groupMult)
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(finalBudget)
  }, [selectedDestinations, store.duration, store.group])

  const idealDuration = React.useMemo(() => {
    if (selectedDestinations.length === 0) return "—"
    
    let baseDays = selectedDestinations.length * 4 + 2
    if (store.duration === "weekend") baseDays = Math.min(baseDays, 4)
    else if (store.duration === "1-week") baseDays = Math.min(baseDays, 8)
    else if (store.duration === "2-weeks") baseDays = Math.max(baseDays, 14)
    else if (store.duration === "1-month") baseDays = Math.max(baseDays, 28)

    return `${baseDays} Days`
  }, [selectedDestinations, store.duration])

  const computedWeather = React.useMemo(() => {
    if (selectedDestinations.length === 0) return "—"
    
    const seasons: string[] = []
    selectedDestinations.forEach((id) => {
      const match = DEFAULT_DESTINATIONS.find((d) => d.id === id)
      if (match) {
        if (["japan", "paris"].includes(id)) seasons.push("Spring")
        else if (["switzerland", "italy", "new-zealand"].includes(id)) seasons.push("Summer")
        else if (["bali", "thailand", "singapore", "maldives"].includes(id)) seasons.push("Tropical")
        else if (["iceland", "dubai"].includes(id)) seasons.push("Cool")
        else if (["south-korea"].includes(id)) seasons.push("Autumn")
      }
    })

    const uniqueSeasons = Array.from(new Set(seasons))
    if (uniqueSeasons.length === 0) return "Pleasant"
    if (uniqueSeasons.length <= 2) return uniqueSeasons.join(" & ")
    return "Mixed"
  }, [selectedDestinations])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <GlassPanel
        glowColor="blue"
        className="p-6 bg-blue-50/20 border-blue-100/50 dark:bg-slate-900/30 dark:border-white/5 shadow-md text-left rounded-3xl relative overflow-hidden"
      >
        {/* Glow ambient background element */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

        {/* AI TRAVEL PROFILE (PREFERENCES VARIANT) */}
        {variant === "preferences" ? (
          <>
            {/* Card Header Section */}
            <div className="flex items-start gap-3.5 mb-5 border-b border-black/5 dark:border-white/5 pb-4 select-none">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shadow-inner">
                <Brain className="size-5 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  🤖 AI Travel Profile
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Your real-time generated profile parameters.
                </p>
              </div>
            </div>

            {/* Selected parameters list */}
            <div className="space-y-3.5 mb-5 select-none">
              {/* Traveler Type */}
              <div className="grid grid-cols-3 gap-2 items-start">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-0.5">
                  Traveler Type:
                </span>
                <span className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350 leading-normal">
                  {travelerTypeLabel || <span className="text-slate-400 dark:text-slate-650 italic font-medium">Not selected</span>}
                </span>
              </div>

              {/* Budget */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Budget:
                </span>
                <span className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350">
                  {budgetLabel || <span className="text-slate-400 dark:text-slate-650 italic font-medium">Not selected</span>}
                </span>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Duration:
                </span>
                <span className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350">
                  {durationLabel || <span className="text-slate-400 dark:text-slate-650 italic font-medium">Not selected</span>}
                </span>
              </div>

              {/* Group */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Group:
                </span>
                <span className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350">
                  {groupLabel || <span className="text-slate-400 dark:text-slate-650 italic font-medium">Not selected</span>}
                </span>
              </div>

              {/* Pace */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Pace:
                </span>
                <span className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350">
                  {paceLabel || <span className="text-slate-400 dark:text-slate-650 italic font-medium">Not selected</span>}
                </span>
              </div>
            </div>

            {/* Suggested Destinations Block */}
            <div className="border-t border-black/5 dark:border-white/5 pt-4 mb-4 select-none">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-2.5">
                Suggested Destinations
              </span>
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {suggestedDestinations.map((dest) => (
                    <motion.div
                      key={dest.name}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      <span className="text-base leading-none select-none">{dest.flag}</span>
                      <span>{dest.name}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Estimated Budget & Confidence Footer */}
            <div className="border-t border-black/5 dark:border-white/5 pt-4 select-none space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Estimated Budget
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={estimatedBudget || "empty-budget"}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="text-sm font-extrabold text-primary-blue dark:text-blue-400"
                  >
                    {estimatedBudget || "—"}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                    AI Confidence
                  </span>
                  <motion.span
                    key={preferencesConfidence}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400"
                  >
                    {preferencesConfidence}%
                  </motion.span>
                </div>

                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${preferencesConfidence}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* AI TRAVEL PROFILE (DESTINATIONS VARIANT) */
          <>
            {/* Card Header Section */}
            <div className="flex items-start gap-3.5 mb-5 border-b border-black/5 dark:border-white/5 pb-4 select-none">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shadow-inner">
                <Brain className="size-5 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  🤖 Your AI Travel Profile
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Real-time custom itinerary metrics.
                </p>
              </div>
            </div>

            {/* Travel Parameters */}
            <div className="space-y-3.5 mb-5 select-none">
              {/* Traveler */}
              <div className="grid grid-cols-3 gap-2 items-start">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-0.5">
                  Traveler:
                </span>
                <span className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350 leading-normal">
                  {travelerText}
                </span>
              </div>

              {/* Selected Destinations Tag display */}
              <div className="grid grid-cols-3 gap-2 items-start">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-0.5">
                  Selected:
                </span>
                <div className="col-span-2 flex flex-col gap-1.5 min-h-[50px]">
                  <AnimatePresence mode="popLayout">
                    {chosenDestinationsList.map((dest) => (
                      <motion.div
                        key={dest.name}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-350"
                      >
                        <span>{dest.flag}</span>
                        <span>{dest.name}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {selectedDestinations.length === 0 && (
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-650 italic">
                      None selected
                    </span>
                  )}
                </div>
              </div>

              {/* Estimated Budget */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Budget:
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={destinationsEstimatedBudget}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="col-span-2 text-xs font-extrabold text-primary-blue dark:text-blue-400"
                  >
                    {destinationsEstimatedBudget}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Ideal Duration */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Ideal Duration:
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idealDuration}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350"
                  >
                    {idealDuration}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Weather */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Weather:
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={computedWeather}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="col-span-2 text-xs font-bold text-slate-700 dark:text-slate-350"
                  >
                    {computedWeather}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Confidence score Footer */}
            <div className="border-t border-black/5 dark:border-white/5 pt-4 select-none flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Confidence
                </span>
                <motion.span
                  key={destinationsConfidence}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400"
                >
                  {destinationsConfidence}%
                </motion.span>
              </div>

              <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${destinationsConfidence}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
          </>
        )}
      </GlassPanel>
    </motion.div>
  )
}
