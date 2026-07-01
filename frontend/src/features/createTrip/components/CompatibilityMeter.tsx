"use client"

import * as React from "react"
import { Star, Percent } from "lucide-react"
import { usePreferences } from "../hooks/usePreferences"
import { useTravelDatesStore } from "../store/travelDatesStore"

export function CompatibilityMeter() {
  const { selectedInterests } = usePreferences()
  const destination = useTravelDatesStore((state) => state.destination) || "Tokyo"

  const data = React.useMemo(() => {
    const isTokyo = destination.toLowerCase().includes("tokyo")
    const isParis = destination.toLowerCase().includes("paris")
    const isRome = destination.toLowerCase().includes("rome")

    // Default traits of the destination
    let cultureStars = 4
    let foodStars = 4
    let natureStars = 3
    let nightlifeStars = 3

    if (isTokyo) {
      cultureStars = 5
      foodStars = 5
      natureStars = 3
      nightlifeStars = 4
    } else if (isParis) {
      cultureStars = 5
      foodStars = 5
      natureStars = 3.5
      nightlifeStars = 4
    } else if (isRome) {
      cultureStars = 5
      foodStars = 5
      natureStars = 4
      nightlifeStars = 3
    }

    // Calculate score
    let baseScore = 75
    if (selectedInterests.includes("culture") || selectedInterests.includes("history")) {
      baseScore += cultureStars >= 4.5 ? 8 : 4
    }
    if (selectedInterests.includes("culinary")) {
      baseScore += foodStars >= 4.5 ? 8 : 4
    }
    if (selectedInterests.includes("nature") || selectedInterests.includes("adventure")) {
      baseScore += natureStars >= 4 ? 6 : 2
    }
    if (selectedInterests.includes("nightlife")) {
      baseScore += nightlifeStars >= 4 ? 6 : 2
    }
    if (selectedInterests.includes("luxury") || selectedInterests.includes("shopping")) {
      baseScore += 3
    }

    // Add some random variation or keep it bounded
    const score = Math.min(baseScore, 99)

    return {
      score,
      ratings: [
        { name: "Culture", rating: cultureStars },
        { name: "Food", rating: foodStars },
        { name: "Nature", rating: natureStars },
        { name: "Nightlife", rating: nightlifeStars }
      ]
    }
  }, [destination, selectedInterests])

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <span className="text-sm">🎯</span>
          <span>{destination} Compatibility</span>
        </div>
        <span className="text-xs font-black text-emerald-650 dark:text-emerald-450 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          {data.score}%
        </span>
      </div>

      {/* Star breakdown */}
      <div className="space-y-2">
        {data.ratings.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-650 dark:text-slate-400">{item.name}</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const filled = starIndex <= item.rating
                return (
                  <Star
                    key={starIndex}
                    className={`size-3.5 ${
                      filled
                        ? "text-blue-500 fill-blue-500"
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
