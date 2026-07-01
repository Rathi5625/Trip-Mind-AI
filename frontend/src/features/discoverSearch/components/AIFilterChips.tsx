"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { useSearchStore } from "../store/searchStore"

export function AIFilterChips() {
  const { activeAIFilters, toggleAIFilter } = useSearchStore()

  const aiChips = [
    "Best for Foodies",
    "Hidden Gems",
    "Luxury Under ₹2L",
    "No Visa Required",
    "Least Crowded",
    "Trending This Month",
    "Instagram Worthy",
    "Family Friendly"
  ]

  return (
    <div className="w-full text-left space-y-2.5 select-none">
      
      {/* Title */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <Sparkles className="size-4 text-blue-500 fill-blue-500/10" />
        <span>AI Filters</span>
      </div>

      {/* List */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
        {aiChips.map((chip) => {
          const isActive = activeAIFilters.includes(chip)
          return (
            <button
              key={chip}
              onClick={() => toggleAIFilter(chip)}
              className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer
                ${
                  isActive
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "border-black/5 bg-white text-slate-550 hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-400"
                }
              `}
            >
              {chip}
            </button>
          )
        })}
      </div>

    </div>
  )
}
