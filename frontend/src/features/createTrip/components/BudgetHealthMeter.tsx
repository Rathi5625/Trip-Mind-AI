"use client"

import * as React from "react"
import { CheckCircle2, AlertCircle, Heart } from "lucide-react"
import { useBudgetStore } from "../store/budgetStore"
import { useCurrency } from "../hooks/useCurrency"

export function BudgetHealthMeter() {
  const sliderValue = useBudgetStore((state) => state.sliderValue)
  const { formatValue } = useCurrency()

  // Calculate dynamic health stats
  let healthScore = 92
  let flightsStatus: "ok" | "warn" = "ok"
  let hotelsStatus: "ok" | "warn" = "ok"
  let foodStatus: "ok" | "warn" = "ok"
  let activitiesStatus: "ok" | "warn" = "ok"
  let suggestion = "Excellent budget range. Your allocation perfectly aligns with Comfort tier averages."

  if (sliderValue < 1200) {
    healthScore = 68
    flightsStatus = "ok"
    hotelsStatus = "warn"
    foodStatus = "warn"
    activitiesStatus = "warn"
    suggestion = `Consider increasing budget by ${formatValue(300)} to secure private lodging rooms.`
  } else if (sliderValue < 2000) {
    healthScore = 82
    foodStatus = "warn"
    hotelsStatus = "ok"
    suggestion = `Increase your budget by ${formatValue(150)} for a more comfortable dining experience.`
  } else if (sliderValue < 4000) {
    healthScore = 92
    foodStatus = "warn" // Matching the mockup exactly: Food has warning triangle, others have green checkmarks!
    suggestion = `Increase your dining allocation by ${formatValue(200)} to enjoy premium sushi dinners.`
  } else {
    healthScore = 98
    suggestion = "Ideal funding tier! Fully covers fine-dining, luxury stays, and private guide escorts."
  }

  const renderStatus = (status: "ok" | "warn") => {
    if (status === "ok") {
      return <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
    }
    return <AlertCircle className="size-4 text-amber-500 shrink-0 animate-bounce" />
  }

  return (
    <div className="p-5 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 select-none space-y-4 shadow-sm w-full">
      {/* Title / Score Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-450">
          <Heart className="size-4 fill-emerald-500/15" />
          <span className="text-[9.5px] font-black uppercase tracking-wider">Budget Health</span>
        </div>
        <span className="text-xs font-black text-emerald-650 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          {healthScore}%
        </span>
      </div>

      {/* Categories Checklist */}
      <div className="grid grid-cols-2 gap-3 text-[10px] font-black uppercase text-slate-550 dark:text-slate-400 tracking-wider">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5">
          <span>Flights</span>
          {renderStatus(flightsStatus)}
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5">
          <span>Hotels</span>
          {renderStatus(hotelsStatus)}
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5">
          <span>Food</span>
          {renderStatus(foodStatus)}
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5">
          <span>Activities</span>
          {renderStatus(activitiesStatus)}
        </div>
      </div>

      {/* Recommendation tip box */}
      <div className="pt-2 border-t border-emerald-500/10 text-[9.5px] font-semibold text-slate-650 dark:text-slate-350">
        <span className="font-bold text-slate-400 block text-[7.5px] uppercase tracking-wider">Recommendation:</span>
        <span className="mt-0.5 block leading-relaxed">{suggestion}</span>
      </div>
    </div>
  )
}
