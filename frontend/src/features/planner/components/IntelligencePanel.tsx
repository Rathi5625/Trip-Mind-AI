"use client"

import * as React from "react"
import { CloudSun } from "lucide-react"
import { MapPreview } from "./MapPreview"
import { ReadinessCard } from "./ReadinessCard"
import { OptimizationCard } from "./OptimizationCard"
import { CrowdCard } from "./CrowdCard"
import { BudgetBreakdown } from "./BudgetBreakdown"
import { ItineraryWorkspaceData } from "../services/itinerary.service"
import { Activity } from "../types/itinerary"
import { cn } from "@/lib/utils"

interface IntelligencePanelProps {
  data: ItineraryWorkspaceData
  activeActivities: Activity[]
  className?: string
}

export function IntelligencePanel({ data, activeActivities, className }: IntelligencePanelProps) {
  const { metrics, budget } = data

  return (
    <aside
      className={cn(
        "flex flex-col gap-5 p-4 border-l border-black/5 bg-white/40 dark:border-white/5 dark:bg-slate-950/40 backdrop-blur-xl shrink-0 select-none w-80 h-full overflow-y-auto no-scrollbar",
        className
      )}
    >
      {/* 1. Header with Avatars */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Intelligence
        </h3>
        
        {/* Avatars group */}
        <div className="flex items-center">
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[9px] font-black text-white shrink-0 shadow-sm z-30">
            AT
          </div>
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[9px] font-black text-white shrink-0 -ml-2 shadow-sm z-20">
            JS
          </div>
          <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-slate-600 text-[8px] font-black shrink-0 -ml-2 shadow-sm z-10 dark:bg-slate-800 dark:text-slate-400">
            +1
          </div>
        </div>
      </div>

      {/* 2. Map Route Preview */}
      <MapPreview activities={activeActivities} />

      {/* 3. Metrics 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {/* Row 1, Col 1: Readiness */}
        <ReadinessCard
          score={metrics.readiness}
          status={metrics.visaStatus}
        />

        {/* Row 1, Col 2: Price Alert */}
        <OptimizationCard alertMessage={metrics.priceAlert} />

        {/* Row 2, Col 1: Weather */}
        <div className="flex flex-col justify-between p-4.5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 h-28 select-none">
          <div className="flex items-center gap-1.5 text-slate-450 dark:text-slate-500">
            <CloudSun className="size-4.5 text-orange-500 shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-wider">Weather</span>
          </div>
          <div className="space-y-0.5 mt-2">
            <span className="block text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
              {metrics.temp}
            </span>
            <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 truncate">
              {metrics.weatherStatus}
            </span>
          </div>
        </div>

        {/* Row 2, Col 2: Crowds */}
        <CrowdCard
          level={metrics.crowdLevel}
          status={metrics.crowdStatus}
        />
      </div>

      {/* 4. Estimated Budget Breakdown */}
      <BudgetBreakdown budget={budget} />
    </aside>
  )
}
