"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useTripWizard } from "../hooks/useTripWizard"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { useTravelDatesStore } from "../store/travelDatesStore"
import { useBudgetStore } from "../store/budgetStore"

export function NavigationActions() {
  const { selectedDestination } = useTripWizard()
  const router = useRouter()
  const pathname = usePathname()

  const isNextDisabled = () => {
    if (pathname === "/planner/create-trip") return !selectedDestination
    return false
  }

  const handleNext = () => {
    if (pathname === "/planner/create-trip") {
      if (selectedDestination) {
        useTravelDatesStore.getState().setDestination(selectedDestination.name)
        useBudgetStore.getState().setDestination(selectedDestination.name)
      }
      router.push("/planner/create-trip/dates")
    }
  }

  return (
    <div className="flex items-center justify-between w-full pt-6 border-t border-slate-100 dark:border-white/5 select-none">
      {/* Back Button */}
      <button
        disabled={true}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all duration-250 cursor-pointer border opacity-0 pointer-events-none"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back</span>
      </button>

      {/* Next / Generate Button */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled()}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all duration-250 cursor-pointer text-white shadow-md",
          isNextDisabled()
            ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-650 cursor-not-allowed shadow-none"
            : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        <span>Next Step</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  )
}

