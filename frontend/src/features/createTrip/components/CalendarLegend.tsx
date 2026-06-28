"use client"

import * as React from "react"

export function CalendarLegend() {
  return (
    <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 dark:text-slate-550 select-none pt-2">
      <div className="flex items-center gap-2">
        <span className="flex size-3.5 rounded-full bg-blue-600 shadow-sm border border-blue-500/20" />
        <span>Selected Dates</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex size-3.5 rounded-full bg-blue-500/10 border border-blue-500/20" />
        <span>Active Travel Period</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex size-3.5 rounded-full border border-blue-500" />
        <span>Today's Date</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex size-3.5 items-center justify-center rounded-full bg-white/95 dark:bg-slate-900 border text-[7px]">🍁</span>
        <span>AI Recommended Highlights</span>
      </div>
    </div>
  )
}
