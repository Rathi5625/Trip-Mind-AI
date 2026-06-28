"use client"

import * as React from "react"
import { Sparkles, Compass, Hotel, ShieldAlert } from "lucide-react"
import { useRecommendations } from "../hooks/useRecommendations"
import { ATLAS_TRENDS, DESTINATIONS } from "../constants/destinationData"
import { useTripWizardStore } from "../store/tripWizardStore"

export function AtlasAssistant() {
  const { triggerSurprise, isLoading } = useRecommendations()
  const { setSelectedDestination, setStep, setSearchQuery, setPreferences } = useTripWizardStore()

  const handleProactiveSelect = (query: string, pref: string) => {
    const tokyo = DESTINATIONS.find((d) => d.id === "tokyo-luxury")
    if (tokyo) {
      setSelectedDestination(tokyo)
      setPreferences([pref])
      setSearchQuery(query)
      setStep(2) // Automatically start date selection step
    }
  }

  return (
    <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl w-full select-none gap-5">
      {/* Avatar Head */}
      <div className="flex items-center gap-3">
        <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20">
          <span className="text-lg">🤖</span>
          {/* Status Dot */}
          <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Atlas</h4>
          <span className="text-[9px] font-bold text-blue-500 flex items-center gap-1">
            <span className="flex size-1.5 rounded-full bg-blue-500 animate-pulse" />
            Live Recommendations
          </span>
        </div>
      </div>

      <p className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
        I'm analyzing global travel trends to find your perfect consultation match...
      </p>

      {/* Proactive Atlas Suggestion Block */}
      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-3">
        <div className="flex items-center gap-1.5 text-blue-650 dark:text-blue-400">
          <span className="text-sm">💬</span>
          <span className="text-[9px] font-black uppercase tracking-wider">Atlas Suggestion</span>
        </div>
        <p className="text-[10px] font-semibold text-slate-650 dark:text-slate-350 leading-relaxed">
          Based on your profile, I think you'd love <span className="font-extrabold text-slate-800 dark:text-slate-150">Japan</span> in October.
        </p>
        
        <div className="grid grid-cols-2 gap-2 pt-1">
          {[
            { label: "Food Tour", emoji: "🍣", pref: "Food", query: "Tokyo culinary and sushi food tour" },
            { label: "Culture Trip", emoji: "🏯", pref: "Culture", query: "Kyoto and Tokyo historic temples culture" },
            { label: "Scenic Escape", emoji: "🌸", pref: "Nature", query: "Mount Fuji scenic cherry blossom nature" },
            { label: "Luxury Tour", emoji: "🎌", pref: "Luxury", query: "Tokyo high-end luxury shopping hotels" }
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleProactiveSelect(opt.query, opt.pref)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-black/5 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-[9.5px] font-bold text-slate-700 dark:text-slate-350 transition-colors shadow-sm cursor-pointer text-left"
            >
              <span>{opt.emoji}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className="space-y-3">
        {/* Trend 1 */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-650 dark:text-emerald-450">
            <Compass className="size-3.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Trending Match</span>
          </div>
          <p className="text-[10px] font-semibold text-slate-650 dark:text-slate-350 leading-relaxed">
            <span className="font-extrabold text-slate-800 dark:text-slate-150">{ATLAS_TRENDS.trendingMatch.country}</span> is {ATLAS_TRENDS.trendingMatch.reason}
          </p>
        </div>

        {/* Trend 2 */}
        <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-650 dark:text-amber-400">
            <Hotel className="size-3.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Luxury Highlight</span>
          </div>
          <p className="text-[10px] font-semibold text-slate-650 dark:text-slate-350 leading-relaxed">
            Consider <span className="font-extrabold text-slate-800 dark:text-slate-150">{ATLAS_TRENDS.luxuryHighlight.destination}</span> {ATLAS_TRENDS.luxuryHighlight.reason}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={triggerSurprise}
        disabled={isLoading}
        className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 py-3 rounded-2xl text-[10.5px] font-black text-white bg-gradient-to-r from-blue-600 to-amber-650 hover:from-blue-700 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all uppercase tracking-wider"
      >
        <Sparkles className="size-3.5 fill-white/20 animate-pulse" />
        {isLoading ? "Analyzing Trends..." : "Surprise Me With Luxury"}
      </button>
    </div>
  )
}
