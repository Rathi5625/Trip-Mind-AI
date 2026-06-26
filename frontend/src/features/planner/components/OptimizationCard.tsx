"use client"

import * as React from "react"
import { TrendingDown } from "lucide-react"

interface OptimizationCardProps {
  alertMessage: string
}

export function OptimizationCard({ alertMessage }: OptimizationCardProps) {
  const handleAction = () => {
    alert("Navigating to flights partner booking checkout...")
  }

  return (
    <div className="flex flex-col justify-between p-4.5 rounded-3xl border border-blue-500/10 bg-blue-500/5 shadow-sm dark:border-blue-550/15 dark:bg-blue-950/20 h-28 select-none">
      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
        <TrendingDown className="size-4 shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-wider">Price Alert</span>
      </div>
      
      <div className="space-y-2 mt-2">
        <p className="text-[10px] font-black text-slate-800 dark:text-slate-100 leading-snug">
          {alertMessage}
        </p>
        
        <button
          onClick={handleAction}
          className="inline-flex w-max items-center justify-center px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-[9px] font-black text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md cursor-pointer transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
