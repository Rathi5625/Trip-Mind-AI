"use client"

import * as React from "react"
import { Utensils } from "lucide-react"

interface DiningInsightProps {
  suggestionText: string
}

export function DiningInsight({ suggestionText }: DiningInsightProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-left select-none">
      
      {/* Icon circular background */}
      <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-500 shrink-0">
        <Utensils className="size-4.5" />
      </div>

      <div className="space-y-1">
        <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-450 tracking-wider leading-none">
          Dining Suggestion
        </h4>
        <p className="text-[10.5px] font-semibold text-slate-655 dark:text-slate-355 leading-relaxed">
          {suggestionText}
        </p>
      </div>

    </div>
  )
}
