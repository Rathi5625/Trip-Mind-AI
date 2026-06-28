"use client"

import * as React from "react"
import { TrendingDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getMarketInsights } from "../services/budget.service"
import { useBudgetStore } from "../store/budgetStore"

export function MarketInsightCard() {
  const destination = useBudgetStore((state) => state.destination)
  const { data: insights } = useQuery({
    queryKey: ["marketInsights", destination],
    queryFn: () => getMarketInsights(destination),
    staleTime: 5000
  })

  return (
    <div className="flex items-start gap-3.5 p-4 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 select-none text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm">
      <div className="flex size-7 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 shrink-0">
        <TrendingDown className="size-4" />
      </div>
      <div>
        <span className="block text-[8px] font-black uppercase text-emerald-600 dark:text-emerald-450 tracking-wider">
          AI Market Intelligence
        </span>
        <p className="mt-0.5">
          {insights?.message || `Flight prices to ${destination} are currently 12% lower than average. This is an excellent time to book.`}
        </p>
      </div>
    </div>
  )
}
