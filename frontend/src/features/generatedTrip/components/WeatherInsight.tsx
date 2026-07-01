"use client"

import * as React from "react"
import { Sun } from "lucide-react"

interface WeatherInsightProps {
  alertText: string
}

export function WeatherInsight({ alertText }: WeatherInsightProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-left select-none">
      
      {/* Icon circular background */}
      <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-500 shrink-0">
        <Sun className="size-4.5" />
      </div>

      <div className="space-y-1">
        <h4 className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-450 tracking-wider leading-none">
          Weather Alert
        </h4>
        <p className="text-[10.5px] font-semibold text-slate-655 dark:text-slate-355 leading-relaxed">
          {alertText}
        </p>
      </div>

    </div>
  )
}
