"use client"

import * as React from "react"
import { Sparkles, Check } from "lucide-react"

export function AISearchExplanation() {
  const points = [
    "Cultural experiences",
    "Mid-range budget",
    "Autumn travel",
    "Food-focused destinations",
    "Balanced pace"
  ]

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          <span>🤖</span>
          <span>Why These Results?</span>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-lg text-[9px] font-black text-blue-500 uppercase tracking-wide">
          97% Confidence
        </div>
      </div>

      <p className="text-[10px] font-bold text-slate-400">
        Based on your profile, our AI prioritized the following matches:
      </p>

      {/* Grid of prioritized criteria */}
      <div className="space-y-2.5 pl-1">
        {points.map((pt) => (
          <div key={pt} className="flex items-center gap-2">
            <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Check className="size-2.5 stroke-[3]" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300">
              {pt}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
