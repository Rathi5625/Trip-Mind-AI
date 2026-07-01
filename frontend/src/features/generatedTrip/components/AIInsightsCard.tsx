"use client"

import * as React from "react"
import { Lightbulb } from "lucide-react"
import { WeatherInsight } from "./WeatherInsight"
import { DiningInsight } from "./DiningInsight"

interface AIInsightsCardProps {
  weatherAlert: string
  diningSuggestion: string
}

export function AIInsightsCard({ weatherAlert, diningSuggestion }: AIInsightsCardProps) {
  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-orange-500 tracking-wider">
        <Lightbulb className="size-4 text-orange-500 fill-orange-500/10" />
        <span>AI Insights</span>
      </div>

      {/* Grid containing Weather Alert & Dining Suggestion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherInsight alertText={weatherAlert} />
        <DiningInsight suggestionText={diningSuggestion} />
      </div>

    </div>
  )
}
