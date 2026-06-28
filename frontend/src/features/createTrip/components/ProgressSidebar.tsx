"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { getTravelersAdvice } from "../services/travelers.service"
import { useTravelers } from "../hooks/useTravelers"

export function ProgressSidebar() {
  const { groupType } = useTravelers()
  
  // Fetch AI suggestion dialog dynamically based on selected group Dynamic type
  const { data: advice } = useQuery({
    queryKey: ["travelersAdvice", groupType],
    queryFn: () => getTravelersAdvice(groupType),
    staleTime: 5000
  })

  return (
    <div className="flex flex-col gap-5 select-none w-full">
      
      {/* 1. AI Concierge Card */}
      <div className="p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl gap-4 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20">
            <span className="text-lg">🤖</span>
            <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">AI Concierge</h4>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">Analyzing preferences...</span>
          </div>
        </div>

        {/* Dynamic Bubble advice */}
        <div className="relative p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-[10.5px] font-semibold text-slate-700 dark:text-slate-350 leading-relaxed font-sans mt-1">
          <div className="absolute top-4 -left-1.5 size-3 bg-blue-500/5 border-l border-b border-blue-500/10 rotate-45 dark:bg-slate-900/50" />
          
          <span className="block text-[8px] font-black uppercase text-blue-500 mb-1">Wizard Step 4 — Who's going?</span>
          <p className="font-extrabold text-slate-850 dark:text-slate-100">
            {advice || "Knowing your travel companions helps me recommend the right mix of activities, pacing, and accommodations."}
          </p>
        </div>
      </div>

      {/* 2. Progress Stepper Panel */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
            Progress
          </span>
          <span className="text-xs font-black text-blue-600 dark:text-blue-450">
            66%
          </span>
        </div>
        
        {/* Progress bar container */}
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-blue-600 dark:bg-blue-450 rounded-full animate-pulse" />
        </div>
      </div>

    </div>
  )
}
