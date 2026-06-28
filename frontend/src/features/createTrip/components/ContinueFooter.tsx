"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useTravelDates } from "../hooks/useTravelDates"
import { useRouter } from "next/navigation"

export function ContinueFooter() {
  const { getSelectedDaysCount, selectedRange } = useTravelDates()
  const router = useRouter()
  const daysCount = getSelectedDaysCount()

  const handleBack = () => {
    router.push("/planner/create-trip")
  }

  const handleContinue = () => {
    if (!selectedRange.start || !selectedRange.end) return
    // Navigate to next wizard step (Budget/Preferences)
    router.push("/planner/create-trip/budget")
  }

  return (
    <div className="flex items-center justify-between w-full p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10.5px] font-black uppercase tracking-widest text-slate-655 bg-white hover:bg-slate-50 border border-black/5 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-white/5 dark:text-slate-350 transition-colors cursor-pointer"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back</span>
      </button>

      {/* Selected Days count */}
      {daysCount > 0 ? (
        <span className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
          {daysCount} Days Selected
        </span>
      ) : (
        <span className="text-[11px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest animate-pulse">
          Select date range on calendar
        </span>
      )}

      {/* Continue CTA */}
      <button
        onClick={handleContinue}
        disabled={!selectedRange.start || !selectedRange.end}
        className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10.5px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-colors cursor-pointer"
      >
        <span>Continue to Budget</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  )
}
