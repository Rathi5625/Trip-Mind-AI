"use client"

import * as React from "react"
import { usePlannerStore } from "../store/plannerStore"
import { DestinationPreview } from "./DestinationPreview"
import { WeatherCard } from "./WeatherCard"
import { BudgetEstimator } from "./BudgetEstimator"
import { cn } from "@/lib/utils"

interface InsightPanelProps {
  className?: string
}

export function InsightPanel({ className }: InsightPanelProps) {
  const { currentDestination } = usePlannerStore()

  return (
    <aside
      className={cn(
        "flex flex-col gap-5 p-4 border-l border-black/5 bg-white/40 dark:border-white/5 dark:bg-slate-950/40 backdrop-blur-xl shrink-0 select-none w-80 h-full overflow-y-auto no-scrollbar",
        className
      )}
    >
      {/* Header with Avatars */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Insights
        </h3>
        
        {/* Avatars group */}
        <div className="flex items-center">
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[9px] font-black text-white shrink-0 shadow-sm z-30">
            AT
          </div>
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[9px] font-black text-white shrink-0 -ml-2 shadow-sm z-20">
            JS
          </div>
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-slate-655 text-[8px] font-black shrink-0 -ml-2 shadow-sm z-10 dark:bg-slate-800 dark:text-slate-400">
            +1
          </div>
        </div>
      </div>

      {/* Destination Image Preview */}
      <DestinationPreview
        name={currentDestination.name}
        image={currentDestination.image}
      />

      {/* Weather & Crowd level cards */}
      <WeatherCard
        temp={currentDestination.temp}
        weather={currentDestination.weather}
        crowdLevel={currentDestination.crowdLevel}
      />

      {/* Budget Estimator Cost Progress Bars */}
      <BudgetEstimator budget={currentDestination.budget} />
    </aside>
  )
}
