"use client"

import * as React from "react"
import { Sparkles, Check, Brain } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { motion, AnimatePresence } from "framer-motion"

interface Destination {
  name: string
  flag: string
}

interface TypeData {
  destinations: Destination[]
  focusAreas: string[]
}

const TYPE_MAP: Record<string, TypeData> = {
  backpacker: {
    destinations: [
      { name: "Pai", flag: "🇹🇭" },
      { name: "Cusco", flag: "🇵🇪" },
      { name: "Hanoi", flag: "🇻🇳" },
    ],
    focusAreas: ["Budget Itineraries", "Social Hostels", "Local Street Food"],
  },
  "beach-lover": {
    destinations: [
      { name: "Bali", flag: "🇮🇩" },
      { name: "Maldives", flag: "🇲🇻" },
      { name: "Amalfi Coast", flag: "🇮🇹" },
    ],
    focusAreas: ["Coastal Recreation", "Sunset Viewpoints", "Relaxation Spots"],
  },
  "city-explorer": {
    destinations: [
      { name: "Tokyo", flag: "🇯🇵" },
      { name: "London", flag: "🇬🇧" },
      { name: "New York", flag: "🇺🇸" },
    ],
    focusAreas: ["Metropolitan Culture", "Museums & History", "Urban Nightlife"],
  },
  "food-enthusiast": {
    destinations: [
      { name: "Osaka", flag: "🇯🇵" },
      { name: "Paris", flag: "🇫🇷" },
      { name: "Rome", flag: "🇮🇹" },
    ],
    focusAreas: ["Local Food", "Fine Dining", "Cooking Masterclasses"],
  },
  "adventure-seeker": {
    destinations: [
      { name: "Queenstown", flag: "🇳🇿" },
      { name: "Reykjavík", flag: "🇮🇸" },
      { name: "Interlaken", flag: "🇨🇭" },
    ],
    focusAreas: ["Adventure Activities", "Extreme Sports", "Mountain Trekking"],
  },
  "nature-traveler": {
    destinations: [
      { name: "Switzerland", flag: "🇨🇭" },
      { name: "Banff", flag: "🇨🇦" },
      { name: "Patagonia", flag: "🇦🇷" },
    ],
    focusAreas: ["Scenic Photography", "National Parks", "Wildlife Spotting"],
  },
  "business-traveler": {
    destinations: [
      { name: "Singapore", flag: "🇸🇬" },
      { name: "London", flag: "🇬🇧" },
      { name: "San Francisco", flag: "🇺🇸" },
    ],
    focusAreas: ["Co-working Spaces", "Airport Fast Transit", "Networking Events"],
  },
  "luxury-traveler": {
    destinations: [
      { name: "Santorini", flag: "🇬🇷" },
      { name: "St. Moritz", flag: "🇨🇭" },
      { name: "Bora Bora", flag: "🇵🇫" },
    ],
    focusAreas: ["Premium Lodging", "Private Tour Booking", "Bespoke Concierge Care"],
  },
}

interface AIPersonalizationPreviewProps {
  selectedTypes: string[]
}

export function AIPersonalizationPreview({ selectedTypes }: AIPersonalizationPreviewProps) {
  // Compute dynamically based on selected traveler types
  const { destinations, focusAreas, confidence } = React.useMemo(() => {
    if (selectedTypes.length === 0) {
      // Default placeholder recommendations matching user request mockup state
      return {
        destinations: [
          { name: "Tokyo", flag: "🇯🇵" },
          { name: "Bali", flag: "🇮🇩" },
          { name: "Switzerland", flag: "🇨🇭" },
        ],
        focusAreas: ["Local Food", "Scenic Photography", "Adventure Activities"],
        confidence: 78,
      }
    }

    const combinedDests: Destination[] = []
    const combinedFocus: string[] = []

    // Map each selected ID to its corresponding recommendations
    selectedTypes.forEach((id) => {
      const match = TYPE_MAP[id]
      if (match) {
        combinedDests.push(...match.destinations)
        combinedFocus.push(...match.focusAreas)
      }
    })

    // Deduplicate recommendations
    const uniqueDests = combinedDests.filter(
      (dest, index, self) => self.findIndex((d) => d.name === dest.name) === index
    )
    const uniqueFocus = Array.from(new Set(combinedFocus))

    // Pull round-robin elements or slices to fill exactly 3 spots
    const finalDests = uniqueDests.slice(0, 3)
    const finalFocus = uniqueFocus.slice(0, 3)

    // Calculate confidence score dynamically: 71% base + 7% per selection, maxing at 98%
    const calculatedConfidence = Math.min(71 + selectedTypes.length * 7, 98)

    return {
      destinations: finalDests,
      focusAreas: finalFocus,
      confidence: calculatedConfidence,
    }
  }, [selectedTypes])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto mt-6 px-4"
    >
      <GlassPanel
        glowColor="blue"
        className="p-5 bg-blue-50/20 border-blue-100/50 dark:bg-slate-900/30 dark:border-white/5 shadow-md text-left rounded-2xl relative overflow-hidden"
      >
        {/* Glow ambient background element */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-3.5 mb-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shadow-inner">
            <Brain className="size-5 animate-pulse" />
          </div>
          <div className="space-y-0.5 select-none">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              🤖 AI Personalization Preview
            </h4>
            <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">
              Your travel profile is taking shape.
            </p>
          </div>
        </div>

        {/* Dynamic preview details */}
        <div className="grid grid-cols-2 gap-6 mb-4 select-none">
          {/* Recommended Destinations */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block">
              Recommended for you:
            </span>
            <ul className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {destinations.map((dest) => (
                  <motion.li
                    key={dest.name}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <span className="text-blue-500">•</span>
                    <span>{dest.name}</span>
                    <span className="text-sm">{dest.flag}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Focus Areas */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block">
              Focus Areas:
            </span>
            <ul className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {focusAreas.map((area) => (
                  <motion.li
                    key={area}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <Check className="size-3 text-emerald-500 stroke-[3] shrink-0" />
                    <span className="truncate">{area}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* Dynamic Confidence indicator footer */}
        <div className="border-t border-black/5 dark:border-white/5 pt-3.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Confidence:
            </span>
            <motion.span
              key={confidence}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400"
            >
              {confidence}%
            </motion.span>
          </div>
          
          {/* Animated mini visual loader bar */}
          <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
