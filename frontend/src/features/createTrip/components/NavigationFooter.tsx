"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function NavigationFooter() {
  const router = useRouter()
  const pathname = usePathname()

  const handleBack = () => {
    if (pathname === "/planner/create-trip/travelers") {
      router.push("/planner/create-trip/budget")
    } else {
      router.push("/planner/create-trip/dates")
    }
  }

  const handleNext = () => {
    if (pathname === "/planner/create-trip/budget") {
      router.push("/planner/create-trip/travelers")
    } else {
      router.push("/planner/itinerary")
    }
  }

  return (
    <div className="flex items-center justify-between w-full p-4 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none max-w-xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-655 bg-white hover:bg-slate-50 border border-black/5 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-white/5 dark:text-slate-350 transition-colors cursor-pointer"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back</span>
      </button>
      {/* Steps Indicator readouts */}
      <div className="hidden sm:flex items-center gap-3 text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <span className="flex items-center gap-1">
          <span className={`flex size-4.5 items-center justify-center rounded-full text-[8px] ${pathname === "/planner/create-trip" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>1</span> 
          Destination
        </span>
        <span className="flex items-center gap-1">
          <span className={`flex size-4.5 items-center justify-center rounded-full text-[8px] ${pathname === "/planner/create-trip/dates" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>2</span> 
          Dates
        </span>
        <span className="flex items-center gap-1">
          <span className={`flex size-4.5 items-center justify-center rounded-full text-[8px] ${pathname === "/planner/create-trip/budget" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>3</span> 
          Budget
        </span>
        <span className="flex items-center gap-1">
          <span className={`flex size-4.5 items-center justify-center rounded-full text-[8px] ${pathname === "/planner/create-trip/travelers" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>4</span> 
          Travelers
        </span>
      </div>

      {/* Next CTA */}
      <button
        onClick={handleNext}
        className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors cursor-pointer"
      >
        <span>Next</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  )
}
