"use client"

import * as React from "react"
import { MapPin, Utensils, Hotel, Car, ShieldCheck, Sparkles } from "lucide-react"

interface TripStatsGridProps {
  placesCount: number
  restaurantsCount: number
  hotelsCompared: number
  transportRoutes: number
  savedAmount: number
  matchScore: number
}

export function TripStatsGrid({
  placesCount,
  restaurantsCount,
  hotelsCompared,
  transportRoutes,
  savedAmount,
  matchScore
}: TripStatsGridProps) {
  
  const stats = [
    { label: "Places", value: `${placesCount} Places`, emoji: "📍", color: "text-blue-500" },
    { label: "Restaurants", value: `${restaurantsCount} Restaurants`, emoji: "🍜", color: "text-orange-500" },
    { label: "Hotels compared", value: `${hotelsCompared} Hotels compared`, emoji: "🏨", color: "text-purple-500" },
    { label: "Transport routes", value: `${transportRoutes} Routes`, emoji: "🚖", color: "text-amber-500" },
    { label: "Saved", value: `Saved $${savedAmount}`, emoji: "💰", color: "text-emerald-500" },
    { label: "Match score", value: `${matchScore}% Match Score`, emoji: "⭐", color: "text-rose-500" }
  ]

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <span>Trip Overview</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 text-[10px] font-black uppercase text-slate-550 dark:text-slate-400 tracking-wider">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5 shadow-inner"
          >
            <span className="text-sm shrink-0">{stat.emoji}</span>
            <div className="space-y-0.5">
              <span className="text-[8px] font-semibold text-slate-400 dark:text-slate-550 block leading-none">
                {stat.label}
              </span>
              <span className="font-black text-slate-805 dark:text-slate-205 leading-none block mt-0.5">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
