"use client"

import * as React from "react"
import { DollarSign, Tag, Calendar, PlusCircle, CheckCircle } from "lucide-react"
import { AnalyticsData } from "../types/workspace"

interface WorkspaceExpensesProps {
  analytics: AnalyticsData
  totalLimit?: number
}

export function WorkspaceExpenses({ analytics, totalLimit = 3500 }: WorkspaceExpensesProps) {
  const { totalSpent, expenses } = analytics

  const percentSpent = Math.min((totalSpent / totalLimit) * 100, 100)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
          Trip Expenses & Billing
        </h2>
        <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 mt-0.5">
          Track individual payouts, check invoice references, and audit budget thresholds.
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              Total Budget Utilization
            </span>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">
              ${totalSpent.toLocaleString()} <span className="text-xs text-slate-400">/ ${totalLimit.toLocaleString()}</span>
            </h3>
          </div>
          <span className="text-xs font-black text-emerald-650 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 py-1.5 px-3 rounded-full">
            {percentSpent < 90 ? "UNDER LIMIT" : "LIMIT APPROACHING"}
          </span>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentSpent > 90 ? "bg-red-500" : "bg-primary-blue"
            }`}
            style={{ width: `${percentSpent}%` }}
          />
        </div>
      </div>

      {/* Expense Entries list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Payout Log ({expenses.length} items)
          </h4>
        </div>

        <div className="space-y-2">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-primary-blue flex items-center justify-center shrink-0">
                  <CheckCircle className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-850 dark:text-slate-200">
                    {expense.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 mt-0.5">
                    <span className="uppercase tracking-wider">{expense.category}</span>
                    <span>•</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  -${expense.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
