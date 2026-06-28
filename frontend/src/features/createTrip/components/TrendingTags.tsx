"use client"

import * as React from "react"
import { TRENDING_TAGS } from "../constants/destinationData"
import { useTripWizardStore } from "../store/tripWizardStore"

export function TrendingTags() {
  const setSearchQuery = useTripWizardStore((state) => state.setSearchQuery)

  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-400 select-none">
      <span className="font-black uppercase tracking-wider text-[8.5px] text-slate-400/80 mr-1">AI Trending:</span>
      {TRENDING_TAGS.map((tag) => (
        <button
          key={tag.label}
          onClick={() => setSearchQuery(tag.query)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-800/30 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-350 transition-colors duration-250 cursor-pointer"
        >
          <span>{tag.emoji}</span>
          <span>{tag.label}</span>
        </button>
      ))}
    </div>
  )
}
