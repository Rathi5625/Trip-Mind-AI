"use client"

import * as React from "react"
import { Wallet, Sparkles, TrendingDown, ArrowRight } from "lucide-react"
import { useItineraryStore } from "../store/itineraryStore"

export function CostImpactCard() {
  const { budgetImpact } = useItineraryStore()

  if (!budgetImpact) return null

  const { before, after, savings } = budgetImpact
  const isPositive = savings >= 0
  const currencySymbol = "¥" // Since our Tokyo workspace uses Japanese Yen ¥

  return (
    <div className="flex flex-col p-5 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 shadow-sm dark:border-emerald-550/15 dark:bg-emerald-950/10 w-full select-none gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-450">
          <Wallet className="size-4 shrink-0" />
          <h4 className="text-xs font-black uppercase tracking-wider">Budget Impact</h4>
        </div>
        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="size-2.5 fill-emerald-500 text-emerald-500" />
          Optimized
        </span>
      </div>

      {/* Figures columns */}
      <div className="space-y-3.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-450">Current Budget</span>
          <span className="font-extrabold text-slate-700 dark:text-slate-300">
            {currencySymbol}{before.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-450">After AI Optimization</span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1">
            {currencySymbol}{after.toLocaleString()}
            <ArrowRight className="size-3 text-slate-400" />
          </span>
        </div>

        {/* Savings section */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
          <span className="text-xs font-black text-slate-700 dark:text-slate-350">
            {isPositive ? "Total Savings" : "Additional Cost"}
          </span>
          <span className={`text-sm font-black flex items-center gap-1 ${
            isPositive ? "text-emerald-600 dark:text-emerald-450" : "text-amber-600 dark:text-amber-500"
          }`}>
            {isPositive ? (
              <>
                <TrendingDown className="size-4" />
                <span>{currencySymbol}{savings.toLocaleString()}</span>
              </>
            ) : (
              <span>+{currencySymbol}{Math.abs(savings).toLocaleString()}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
