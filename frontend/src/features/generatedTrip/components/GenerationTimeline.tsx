"use client"

import * as React from "react"
import { Check } from "lucide-react"

export function GenerationTimeline() {
  const steps = [
    "Flights Optimized",
    "Hotels Selected",
    "Restaurants Recommended",
    "Budget Balanced",
    "Hidden Gems Added",
    "Weather Analyzed",
    "Route Optimized"
  ]

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <span>✨</span>
        <span>AI Generation Complete</span>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-black uppercase text-slate-550 dark:text-slate-400 tracking-wider">
        {steps.map((step) => (
          <div
            key={step}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5 shadow-inner"
          >
            <div className="flex size-4 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
              <Check className="size-3 stroke-[3]" />
            </div>
            <span className="truncate">{step}</span>
          </div>
        ))}
      </div>

      {/* Footer readout */}
      <div className="border-t border-black/5 dark:border-white/5 pt-3.5 flex items-center justify-between text-xs font-semibold text-slate-450 dark:text-slate-500">
        <span>Compilation Time</span>
        <span className="font-black text-slate-805 dark:text-slate-100">
          Completed in 18 seconds
        </span>
      </div>

    </div>
  )
}
