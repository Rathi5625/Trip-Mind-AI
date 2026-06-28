"use client"

import * as React from "react"
import { useBudgetStore } from "../store/budgetStore"
import { CurrencyType } from "../types/budget"

export function CurrencySelector() {
  const { currency, setCurrency } = useBudgetStore()

  return (
    <div className="flex p-0.5 rounded-xl border border-black/5 bg-slate-100/50 dark:border-white/10 dark:bg-slate-900/50 select-none">
      {(["USD", "EUR", "JPY"] as CurrencyType[]).map((cur) => {
        const isActive = currency === cur
        return (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={`px-3 py-1 text-[9px] font-black rounded-lg transition-all cursor-pointer ${
              isActive
                ? "bg-white text-slate-850 shadow-sm dark:bg-slate-800 dark:text-slate-105"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            {cur}
          </button>
        )
      })}
    </div>
  )
}
