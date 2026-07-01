"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Compass } from "lucide-react"
import { usePreferences } from "../hooks/usePreferences"

export function AIPersonalityProfile() {
  const { selectedInterests, selectedAccommodation, travelPace } = usePreferences()

  // Calculate dynamic Travel DNA metrics
  const stats = React.useMemo(() => {
    // Explorer Score: base 65%, + 3% per interest, + accommodation/pace modifiers
    let explorerScore = 65
    explorerScore += selectedInterests.length * 4
    if (travelPace === "fast") explorerScore += 6
    if (selectedAccommodation === "luxury") explorerScore += 4
    explorerScore = Math.min(explorerScore, 98) // max out at 98% for realism

    // DNA star ratings (1 to 5 scale)
    let adventure = 2
    if (selectedInterests.includes("adventure")) adventure = 5
    else if (selectedInterests.includes("nature")) adventure = 4
    else if (selectedInterests.includes("photography")) adventure = 3
    if (travelPace === "fast") adventure = Math.min(adventure + 1, 5)

    let culture = 2
    if (selectedInterests.includes("culture")) culture = 5
    else if (selectedInterests.includes("history") || selectedInterests.includes("museums")) culture = 4
    else if (selectedInterests.includes("architecture")) culture = 3

    let luxury = 2
    if (selectedAccommodation === "luxury") luxury = 5
    else if (selectedInterests.includes("luxury")) luxury = 4
    else if (selectedAccommodation === "boutique") luxury = 3.5
    if (selectedInterests.includes("shopping")) luxury = Math.min(luxury + 0.5, 5)

    let relaxation = 2
    if (selectedInterests.includes("wellness")) relaxation = 5
    else if (travelPace === "relaxed") relaxation = 4.5
    else if (travelPace === "balanced") relaxation = 3.5

    let food = 1
    if (selectedInterests.includes("culinary")) food = 5
    else if (selectedInterests.includes("culture")) food = 3

    return {
      explorerScore,
      ratings: [
        { name: "Adventure", rating: adventure },
        { name: "Culture", rating: culture },
        { name: "Luxury", rating: luxury },
        { name: "Relaxation", rating: relaxation },
        { name: "Food", rating: food }
      ]
    }
  }, [selectedInterests, selectedAccommodation, travelPace])

  // Circular progress math
  const radius = 28
  const stroke = 5
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (stats.explorerScore / 100) * circumference

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <span className="text-sm">🌍</span>
        <span>Your Travel DNA</span>
      </div>

      {/* Explorer score dashboard */}
      <div className="flex items-center gap-4 bg-slate-50/50 border border-black/5 dark:bg-slate-950/20 dark:border-white/5 p-3 rounded-2xl">
        
        {/* Circle Progress */}
        <div className="relative size-16 flex items-center justify-center shrink-0">
          <svg className="size-full -rotate-90">
            <circle
              stroke="rgba(37, 99, 235, 0.08)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="dark:stroke-white/5"
            />
            <motion.circle
              stroke="#2563EB"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-xs font-black text-slate-800 dark:text-slate-100">
            {stats.explorerScore}%
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black text-slate-700 dark:text-slate-350 uppercase tracking-wide block">
            Explorer Score
          </span>
          <span className="text-[9px] font-medium text-slate-455 dark:text-slate-500 leading-tight block mt-0.5">
            Your travel personality is dynamically shaping up.
          </span>
        </div>

      </div>

      {/* Ratings rows */}
      <div className="space-y-2">
        {stats.ratings.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400">{item.name}</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const filled = starIndex <= item.rating
                const isHalf = starIndex - 0.5 === item.rating
                return (
                  <Star
                    key={starIndex}
                    className={`size-3.5 ${
                      filled
                        ? "text-amber-400 fill-amber-400"
                        : isHalf
                        ? "text-amber-450 fill-amber-400/50"
                        : "text-slate-200 dark:text-slate-800"
                    }`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
