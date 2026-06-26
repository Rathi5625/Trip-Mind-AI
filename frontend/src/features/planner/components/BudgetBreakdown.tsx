"use client"

import * as React from "react"
import { Calculator } from "lucide-react"
import { ItineraryBudget } from "../types/itinerary"

interface BudgetBreakdownProps {
  budget: ItineraryBudget
}

export function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  const handleOptimizationClick = () => {
    alert("Calculating price comparison models and off-season hotel adjustments...")
  }

  // Percentages relative to total
  const flightPercentage = (budget.flights / budget.total) * 100
  const hotelPercentage = (budget.hotel / budget.total) * 100
  const dailyPercentage = (budget.daily / budget.total) * 100

  return (
    <div className="flex flex-col p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 w-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="size-4 text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-black text-slate-700 dark:text-slate-200">
            Est. Budget
          </span>
        </div>
        <span className="text-sm font-black text-blue-600 dark:text-blue-400">
          ¥{budget.total.toLocaleString()}
        </span>
      </div>

      {/* Progress Bars Stack */}
      <div className="space-y-4 mb-5">
        {/* Flights */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-450">
            <span>Flights</span>
            <span className="text-slate-800 dark:text-slate-200">¥{budget.flights.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-550"
              style={{ width: `${flightPercentage}%` }}
            />
          </div>
        </div>

        {/* Hotels */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-450">
            <span>Hotel ({budget.hotelDetails})</span>
            <span className="text-slate-800 dark:text-slate-200">¥{budget.hotel.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-600"
              style={{ width: `${hotelPercentage}%` }}
            />
          </div>
        </div>

        {/* Daily/Dining */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-450">
            <span>Daily/Dining</span>
            <span className="text-slate-800 dark:text-slate-200">¥{budget.daily.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${dailyPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleOptimizationClick}
        className="w-full text-center py-2.5 rounded-xl border border-blue-500/10 hover:bg-blue-500/5 text-[10px] font-bold text-blue-600 dark:border-blue-500/20 dark:hover:bg-blue-500/10 dark:text-blue-400 transition-all cursor-pointer"
      >
        View Optimization Tips
      </button>
    </div>
  )
}
