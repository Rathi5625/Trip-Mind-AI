"use client"

import * as React from "react"
import { Sparkles, Lightbulb } from "lucide-react"

interface AIRecommendationCardProps {
  reason: string
  matchPercentage: number
  destinationName: string
}

export function AIRecommendationCard({
  reason,
  matchPercentage,
  destinationName
}: AIRecommendationCardProps) {
  return (
    <div className="p-4 rounded-2xl border border-blue-500/10 bg-blue-500/5 select-none text-left space-y-2">
      <div className="flex items-center gap-1 text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <Sparkles className="size-3 fill-blue-500/10 text-blue-500" />
        <span>AI Match Insight</span>
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-black text-slate-805 dark:text-slate-100">
          Why you'll love {destinationName}
        </h4>
        <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-405 leading-relaxed">
          {reason}
        </p>
      </div>
    </div>
  )
}
