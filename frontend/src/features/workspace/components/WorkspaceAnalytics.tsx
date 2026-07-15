"use client"

import * as React from "react"
import { BarChart2, PieChart, TrendingUp, DollarSign } from "lucide-react"
import { AnalyticsData } from "../types/workspace"

interface WorkspaceAnalyticsProps {
  analytics: AnalyticsData
}

export function WorkspaceAnalytics({ analytics }: WorkspaceAnalyticsProps) {
  const { totalSpent, categoryBreakdown } = analytics

  // Calculate percentage of category breakdown
  const sortedCategories = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
          Trip Spending Analytics
        </h2>
        <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 mt-0.5">
          Real-time analysis of travel categories, payouts, and cost savings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Spent Stat */}
        <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm">
          <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-primary-blue flex items-center justify-center mb-3">
            <DollarSign className="size-4.5" />
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
            Total Spent
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-slate-100 block mt-0.5">
            ${totalSpent.toLocaleString()}
          </span>
        </div>

        {/* Categories Stat */}
        <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm">
          <div className="size-9 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-500 flex items-center justify-center mb-3">
            <BarChart2 className="size-4.5" />
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
            Major Categories
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-slate-100 block mt-0.5">
            {sortedCategories.length} Categories
          </span>
        </div>

        {/* Cost Savings Stat */}
        <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm">
          <div className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mb-3">
            <TrendingUp className="size-4.5" />
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
            AI Cost Savings
          </span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-450 block mt-0.5">
            +$150 saved
          </span>
        </div>
      </div>

      {/* Category Breakdown list with progress indicators */}
      <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-5">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          Spending Breakdown by Category
        </h3>

        <div className="space-y-4">
          {sortedCategories.map(([category, amount]) => {
            const pct = totalSpent > 0 ? (amount / totalSpent) * 100 : 0

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{category}</span>
                  <span>
                    ${amount.toLocaleString()} ({pct.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary-blue h-full rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
