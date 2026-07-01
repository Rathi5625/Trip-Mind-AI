"use client"

import * as React from "react"
import { Sun, CloudRain, Wind, Snowflake, Check, AlertCircle } from "lucide-react"
import { TimeSeason } from "../types/destination"

interface BestSeasonCardsProps {
  seasons: TimeSeason[]
  selectedSeason: string
  onSelectSeason: (season: string) => void
}

const SEASON_ICONS: Record<string, any> = {
  Spring: CloudRain,
  Summer: Sun,
  Autumn: Wind,
  Winter: Snowflake
}

export function BestSeasonCards({
  seasons,
  selectedSeason,
  onSelectSeason
}: BestSeasonCardsProps) {
  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-4">
      
      {/* Title */}
      <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
        Best Time To Visit
      </h3>

      {/* Grid of season cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seasons.map((s) => {
          const Icon = SEASON_ICONS[s.name] || Sun
          const isActive = selectedSeason === s.name

          return (
            <div
              key={s.name}
              onClick={() => onSelectSeason(s.name)}
              className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-300
                ${
                  isActive
                    ? "border-blue-650 bg-blue-500/5 shadow-md ring-1 ring-blue-500/30"
                    : "border-black/5 bg-white shadow-sm hover:border-black/10 dark:border-white/5 dark:bg-slate-900/40"
                }
              `}
            >
              
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-200 tracking-wider">
                    {s.name}
                  </h4>
                  <Icon
                    className={`size-4.5
                      ${isActive ? "text-blue-500" : "text-slate-400"}
                    `}
                  />
                </div>

                {/* Weather & Prices info */}
                <div className="space-y-1.5 text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Weather</span>
                    <span className="text-slate-700 dark:text-slate-300 font-black">{s.weather}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prices</span>
                    <span
                      className={`font-black
                        ${
                          s.prices === "Low" || s.prices === "Good" || s.prices === "Fair"
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }
                      `}
                    >
                      {s.prices}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation text overlay */}
              <p className="text-[10px] font-bold text-slate-655 dark:text-slate-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-3">
                {s.aiRecommendation}
              </p>

            </div>
          )
        })}
      </div>

    </div>
  )
}
