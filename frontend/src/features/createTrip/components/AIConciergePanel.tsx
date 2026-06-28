"use client"

import * as React from "react"
import { Sparkles, Calendar, TrendingDown } from "lucide-react"
import { useTravelDatesStore } from "../store/travelDatesStore"

export function AIConciergePanel() {
  const { destination, setSelectedRange, setCurrentMonth } = useTravelDatesStore()

  const handleLockSuggestedDates = () => {
    // Lock in Oct 12 - 24, 2024
    setSelectedRange({
      start: new Date(2024, 9, 12),
      end: new Date(2024, 9, 24)
    })
    // Navigate calendar view to Oct 2024
    setCurrentMonth(new Date(2024, 9, 1))
  }

  return (
    <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl w-full select-none gap-5">
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
      <div className="space-y-2">
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
    </div>
  )
}
