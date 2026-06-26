"use client"

import * as React from "react"
import { Wallet } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { BudgetChart } from "./BudgetChart"
import { BudgetData } from "../types/dashboard"

interface BudgetOverviewProps {
  budget: BudgetData
}

export function BudgetOverview({ budget }: BudgetOverviewProps) {
  return (
    <GlassPanel
      glowColor="none"
      className="p-6 bg-white dark:bg-slate-900/60 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl h-full flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6 select-none">
          <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-inner">
            <Wallet className="size-4 stroke-[2.5]" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
            Budget Overview
          </h3>
        </div>

        {/* Radial Chart Center */}
        <div className="flex justify-center mb-6">
          <BudgetChart spent={budget.spent} total={budget.totalBudget} />
        </div>
      </div>

      {/* Breakdown Items */}
      <div className="space-y-3 pt-2 border-t border-slate-50 dark:border-white/5 w-full select-none">
        {budget.breakdown.map((item) => (
          <div key={item.category} className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-500 dark:text-slate-400">
                {item.category}
              </span>
            </div>
            <span className="text-slate-800 dark:text-slate-200">
              ${item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
