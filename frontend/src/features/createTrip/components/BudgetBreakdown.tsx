"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { BudgetSlice } from "../types/review"

interface BudgetBreakdownProps {
  total: number
  slices: BudgetSlice[]
}

export function BudgetBreakdown({ total, slices }: BudgetBreakdownProps) {
  const router = useRouter()

  const handleEdit = () => {
    router.push("/planner/create-trip/budget")
  }

  // Format currency
  const formatVal = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl relative space-y-4 select-none">
      
      {/* Edit pencil button top right */}
      <button
        onClick={handleEdit}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 transition-colors cursor-pointer"
        aria-label="Edit Budget"
      >
        <Pencil className="size-3.5" />
      </button>

      {/* Header */}
      <div>
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide">
          Budget Target
        </h3>
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">
          {formatVal(total)} Total
        </p>
      </div>

      {/* Segmented Progress Bar */}
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full flex overflow-hidden">
        {slices.map((slice, index) => (
          <div
            key={slice.category}
            className={`${slice.color} h-full`}
            style={{ width: `${slice.percentage}%` }}
            title={`${slice.category}: ${formatVal(slice.amount)} (${slice.percentage}%)`}
          />
        ))}
      </div>

      {/* Grid Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-black uppercase text-slate-550 dark:text-slate-400 tracking-wider">
        {slices.map((slice) => {
          // Extract dot color from background class
          let dotColor = "bg-blue-600"
          if (slice.color.includes("bg-blue")) dotColor = "bg-blue-600 dark:bg-blue-500"
          else if (slice.color.includes("bg-emerald")) dotColor = "bg-emerald-600 dark:bg-emerald-500"
          else if (slice.color.includes("bg-slate")) dotColor = "bg-slate-500 dark:bg-slate-400"
          else dotColor = "bg-amber-600 dark:bg-amber-500" // Fallback brown/orange

          return (
            <div key={slice.category} className="flex items-center gap-2">
              <span className={`size-2 rounded-full shrink-0 ${dotColor}`} />
              <span className="truncate">
                {slice.category} ({formatVal(slice.amount)})
              </span>
            </div>
          )
        })}
      </div>

    </div>
  )
}
