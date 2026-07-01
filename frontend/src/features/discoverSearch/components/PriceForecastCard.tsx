"use client"

import * as React from "react"
import { TrendingDown, ArrowDownRight } from "lucide-react"

export function PriceForecastCard() {
  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left w-full">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <span>✈</span>
        <span>Flight Price Forecast</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        
        {/* Today */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-black/5 dark:border-white/5 space-y-1">
          <span className="block text-[8px] font-black uppercase text-slate-400">Today</span>
          <span className="text-sm font-black text-slate-805 dark:text-white">
            ₹78,000
          </span>
        </div>

        {/* Next Week */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-black/5 dark:border-white/5 space-y-1">
          <span className="block text-[8px] font-black uppercase text-slate-450">Next Week</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-emerald-500">
              ₹71,000
            </span>
            <TrendingDown className="size-3.5 text-emerald-505 shrink-0" />
          </div>
        </div>

      </div>

      {/* Savings Notification footer */}
      <div className="pt-2 flex items-center justify-between border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <ArrowDownRight className="size-4 text-emerald-500" />
          <span>Estimated Savings</span>
        </div>
        <span className="text-xs font-black text-emerald-500">
          ₹7,000
        </span>
      </div>

    </div>
  )
}
