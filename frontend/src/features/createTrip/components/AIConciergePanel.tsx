"use client"

import * as React from "react"
import { Sparkles, Calendar, Bed, Plane, Compass, HelpCircle, Activity } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTravelDatesStore } from "../store/travelDatesStore"
import { usePreferences } from "../hooks/usePreferences"
import { useAccommodation } from "../hooks/useAccommodation"
import { useTravelPace } from "../hooks/useTravelPace"

export function AIConciergePanel() {
  const pathname = usePathname()

  // Dates Store selectors
  const { destination, setSelectedRange, setCurrentMonth } = useTravelDatesStore()

  // Preferences hooks
  const { selectedInterests, insightsData } = usePreferences()
  const { selectedAccommodation } = useAccommodation()
  const { travelPace } = useTravelPace()

  const handleLockSuggestedDates = () => {
    setSelectedRange({
      start: new Date(2024, 9, 12),
      end: new Date(2024, 9, 24)
    })
    setCurrentMonth(new Date(2024, 9, 1))
  }

  // 1. If we are on Step 5: Preferences page
  if (pathname === "/planner/create-trip/preferences") {
    const recText = insightsData?.recommendation || "Tell us what kind of vibe you're looking for, and our AI will curate the perfect itinerary."

    return (
      <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl w-full select-none gap-6 h-full min-h-[500px]">
        {/* Status Header */}
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20">
            <span className="text-lg">🤖</span>
            <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">AI Concierge</h4>
            <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Always active
            </span>
          </div>
        </div>

        {/* Dynamic Bubble Recommendation */}
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-3 relative">
          <div className="absolute top-4 -left-1.5 size-3 bg-blue-500/5 border-l border-b border-blue-500/10 rotate-45 dark:bg-slate-900/50" />
          <div className="flex items-start gap-2">
            <Sparkles className="size-4 text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-350 leading-relaxed">
                {recText}
              </p>
              <button
                onClick={() => alert(`Dynamic Insights: ${insightsData?.insights.planning || 'Select preferences to see live updates!'}`)}
                className="text-[9px] font-black text-blue-600 dark:text-blue-450 hover:underline block cursor-pointer"
              >
                View Insights
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs list */}
        <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 dark:text-slate-500 cursor-not-allowed text-left">
            <Compass className="size-4.5" />
            <span>Context</span>
          </button>
          
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black bg-blue-600 text-white shadow-md shadow-blue-500/10 text-left">
            <Activity className="size-4.5" />
            <span>Planning</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/40 text-left cursor-pointer">
            <Bed className="size-4.5" />
            <span>Hotels</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/40 text-left cursor-pointer">
            <Plane className="size-4.5" />
            <span>Flights</span>
          </button>
        </div>

        {/* Bottom Help action */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] font-bold text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-350 w-full text-left cursor-pointer">
            <HelpCircle className="size-4" />
            <span>Help</span>
          </button>
        </div>
      </div>
    )
  }

  // 2. Default: Step 2 Dates View
  return (
    <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl w-full select-none gap-4">
      {/* Avatar Head */}
      <div className="flex items-center gap-3">
        <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20">
          <span className="text-lg">🤖</span>
          {/* Active status pulse indicator */}
          <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Travel AI</h4>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">Your Personal Concierge</span>
        </div>
      </div>

      {/* Suggested Chat bubble */}
      <div className="relative p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-2">
        {/* Chat tail pointer */}
        <div className="absolute top-4 -left-1.5 size-3 bg-blue-500/5 border-l border-b border-blue-500/10 rotate-45 dark:bg-slate-900/50" />
        <p className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
          You've picked <span className="font-extrabold text-blue-600 dark:text-blue-400">{destination}</span>! October is perfect for autumn foliage. Flights are currently <span className="font-extrabold text-emerald-600 dark:text-emerald-450">12% lower</span> than average for these dates.
        </p>
      </div>

      {/* Suggestion selection chip wrapper */}
      <div className="space-y-1.5">
        <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          Suggested Date Range
        </span>
        
        <button
          onClick={handleLockSuggestedDates}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-blue-500/10 bg-blue-500/5 hover:bg-blue-500/10 text-[10px] font-black text-blue-600 dark:text-blue-400 transition-all cursor-pointer shadow-sm w-full text-left"
        >
          <Calendar className="size-3.5 text-blue-500 shrink-0" />
          <span>Lock in Oct 12 - 24</span>
        </button>
      </div>

      {/* 3. Atlas Recommendation Box */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-2.5">
        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-450">
          <Sparkles className="size-3.5 fill-amber-500/20" />
          <span className="text-[9px] font-black uppercase tracking-wider">Atlas Recommendation</span>
        </div>
        
        <p className="text-[10px] font-semibold text-slate-650 dark:text-slate-355 leading-relaxed">
          Leaving <span className="font-extrabold text-slate-800 dark:text-slate-100">3 days earlier</span> could save approximately <span className="text-emerald-600 dark:text-emerald-450 font-extrabold">₹18,500</span> on flights.
        </p>
        
        <div className="space-y-1.5 pt-1 border-t border-amber-500/10 text-[9.5px] font-bold text-slate-500 dark:text-slate-400">
          <span className="block text-[8px] font-black uppercase text-slate-400">October 15–24 offers:</span>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span>
              <span>Peak autumn colors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span>
              <span>Comfortable weather</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span>
              <span>Lower hotel prices</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Travel Scorecard */}
      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase text-emerald-650 dark:text-emerald-450 tracking-wider">
            Travel Score
          </span>
          <span className="text-xs font-black text-emerald-655 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            96%
          </span>
        </div>

        {/* Stars ratings */}
        <div className="space-y-1.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span>Weather</span>
            <span className="text-amber-500 text-[10px]">⭐⭐⭐⭐⭐</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Budget</span>
            <span className="text-amber-500 text-[10px]">⭐⭐⭐⭐☆</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Crowds</span>
            <span className="text-amber-500 text-[10px]">⭐⭐⭐⭐☆</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Events</span>
            <span className="text-amber-500 text-[10px]">⭐⭐⭐⭐⭐</span>
          </div>
        </div>

        {/* Recommendation text */}
        <div className="pt-2 border-t border-emerald-500/10 text-[9.5px] font-semibold text-slate-600 dark:text-slate-350">
          <span className="font-bold text-slate-400 block text-[8px] uppercase tracking-wider">Overall Recommendation</span>
          <span className="text-slate-805 dark:text-slate-200 font-black">Excellent choice.</span>
        </div>
      </div>
    </div>
  )
}
