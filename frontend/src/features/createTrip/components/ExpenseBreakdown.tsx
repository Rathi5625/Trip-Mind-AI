"use client"

import * as React from "react"
import { useForecast } from "../hooks/useForecast"
import { useCurrency } from "../hooks/useCurrency"

export function ExpenseBreakdown() {
  const { breakdown } = useForecast()
  const { formatValue } = useCurrency()

  const categories = [
    { key: "flights", label: "Flights", value: breakdown.flights, color: "bg-blue-600" },
    { key: "accommodation", label: "Stays", value: breakdown.accommodation, color: "bg-emerald-500" },
    { key: "dining", label: "Dining", value: breakdown.dining, color: "bg-amber-500" },
    { key: "activities", label: "Activities", value: breakdown.activities, color: "bg-[#D6A89C]" }
  ]

  return (
    <div className="grid grid-cols-2 gap-3.5 select-none w-full">
      {categories.map((cat) => (
        <div
          key={cat.key}
          className="flex flex-col p-4 rounded-2xl border border-black/5 bg-slate-50/50 dark:border-white/5 dark:bg-slate-950/20"
        >
          <div className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${cat.color}`} />
            <span className="text-[8.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              {cat.label}
            </span>
          </div>
          <span className="text-sm font-black text-slate-805 dark:text-slate-105 mt-1.5">
            {formatValue(cat.value)}
          </span>
        </div>
      ))}
    </div>
  )
}
