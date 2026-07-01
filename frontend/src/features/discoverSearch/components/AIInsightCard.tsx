"use client"

import * as React from "react"
import { Sparkles, Sun, PiggyBank } from "lucide-react"

export function AIInsightCard() {
  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left w-full">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <Sparkles className="size-4 text-blue-500 fill-blue-500/10" />
        <span>AI Travel Intelligence</span>
      </div>

      {/* Bullet points */}
      <div className="space-y-3 pl-1">
        
        {/* Insight 1: Cost saving */}
        <div className="flex items-start gap-3">
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-505 border border-emerald-500/20 shrink-0">
            <PiggyBank className="size-4" />
          </div>
          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
            Traveling one week later could save up to <span className="font-black text-slate-805 dark:text-white">₹18,000</span> on flights.
          </p>
        </div>

        {/* Insight 2: Weather */}
        <div className="flex items-start gap-3">
          <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-505 border border-amber-500/20 shrink-0">
            <Sun className="size-4" />
          </div>
          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
            Kyoto has significantly better weather than Tokyo during your selected dates (<span className="font-black text-slate-805 dark:text-white">avg 22°C vs 18°C</span>).
          </p>
        </div>

      </div>

    </div>
  )
}
