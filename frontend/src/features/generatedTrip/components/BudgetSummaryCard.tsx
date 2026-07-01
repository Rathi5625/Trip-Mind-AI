"use client"

import * as React from "react"
import { Wallet } from "lucide-react"

interface BudgetSummaryCardProps {
  totalBudget: number
  flightsPercentage: number
  staysPercentage: number
}

export function BudgetSummaryCard({
  totalBudget,
  flightsPercentage,
  staysPercentage
}: BudgetSummaryCardProps) {
  
  const formatVal = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          Estimated Budget
        </span>
        <Wallet className="size-4 text-slate-400" />
      </div>

      {/* Cost & Status */}
      <div className="space-y-1">
        <h3 className="text-2xl font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none">
          {formatVal(totalBudget)}
        </h3>
        <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1.5 pt-0.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Within target range
        </span>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 pt-2">
        {/* Flights */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[9px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wide leading-none">
            <span>Flights</span>
            <span>{flightsPercentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              style={{ width: `${flightsPercentage}%` }}
            />
          </div>
        </div>

        {/* Stays */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[9px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wide leading-none">
            <span>Stays</span>
            <span>{staysPercentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 dark:bg-orange-500 rounded-full"
              style={{ width: `${staysPercentage}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
