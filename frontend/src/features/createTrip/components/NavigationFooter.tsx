"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function NavigationFooter() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/planner/create-trip/dates")
  }

  const handleNext = () => {
    router.push("/planner/itinerary")
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

      {/* Next Step CTA */}
      <button
        onClick={handleNext}
        className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10.5px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors cursor-pointer"
      >
        <span>Next Step</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  )
}
