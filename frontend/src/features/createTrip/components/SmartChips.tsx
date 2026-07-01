"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { usePreferences } from "../hooks/usePreferences"

interface Preset {
  id: string
  label: string
  interests: string[]
  accommodation?: string
  pace?: string
}

const PRESETS: Preset[] = [
  { id: "popular", label: "Most Popular", interests: ["culture", "culinary", "shopping"] },
  { id: "hidden_gems", label: "Hidden Gems", interests: ["nature", "history", "photography"] },
  { id: "foodie", label: "Foodie", interests: ["culinary"] },
  { id: "luxury", label: "Luxury", interests: ["luxury", "shopping"], accommodation: "luxury" },
  { id: "photography", label: "Photography", interests: ["photography", "architecture", "nature"] },
  { id: "family", label: "Family Friendly", interests: ["museums", "nature", "culture"], pace: "relaxed" },
  { id: "adventure", label: "Adventure", interests: ["adventure", "nature"], pace: "fast" },
  { id: "wellness", label: "Wellness", interests: ["wellness"], pace: "relaxed" }
]

export function SmartChips() {
  const { 
    selectedInterests, 
    setSelectedInterests, 
    selectedAccommodation,
    setSelectedAccommodation,
    travelPace,
    setTravelPace 
  } = usePreferences()

  const handlePresetClick = (preset: Preset) => {
    // If all preset interests are already selected, we clear or toggle. Otherwise we apply.
    const allSelected = preset.interests.every((i) => selectedInterests.includes(i))
    
    if (allSelected) {
      // Clear preset interests
      setSelectedInterests(selectedInterests.filter((i) => !preset.interests.includes(i)))
    } else {
      // Union current selected with preset interests
      const newInterests = Array.from(new Set([...selectedInterests, ...preset.interests]))
      setSelectedInterests(newInterests)
    }

    if (preset.accommodation) {
      setSelectedAccommodation(preset.accommodation)
    }
    if (preset.pace) {
      setTravelPace(preset.pace)
    }
  }

  const isPresetActive = (preset: Preset) => {
    const interestsMatch = preset.interests.every((i) => selectedInterests.includes(i))
    const accMatch = preset.accommodation ? selectedAccommodation === preset.accommodation : true
    const paceMatch = preset.pace ? travelPace === preset.pace : true
    return interestsMatch && accMatch && paceMatch
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <Sparkles className="size-3 text-blue-500 fill-blue-500/10" />
        <span>AI Suggestions</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1">
        {PRESETS.map((preset) => {
          const active = isPresetActive(preset)
          return (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border shrink-0 cursor-pointer select-none ${
                active
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 border-black/5 dark:border-white/5 text-slate-655 hover:bg-slate-50 dark:text-slate-355 dark:hover:bg-slate-800"
              }`}
            >
              {preset.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
