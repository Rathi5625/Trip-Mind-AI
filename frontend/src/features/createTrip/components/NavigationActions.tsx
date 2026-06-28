"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { useTripWizard } from "../hooks/useTripWizard"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function NavigationActions() {
  const { step, prevStep, nextStep, selectedDestination, dates, travelers } = useTripWizard()
  const router = useRouter()

  const isNextDisabled = () => {
    if (step === 1) return !selectedDestination
    if (step === 2) return !dates.start || !dates.end
    if (step === 3) return !travelers
    return false
  }

  const handleNext = () => {
    if (step === 5) {
      // Finalize - Redirect to Itinerary page!
      router.push("/planner/itinerary")
    } else {
      nextStep()
    }
  }

  return (
    <div className="flex items-center justify-between w-full pt-6 border-t border-slate-100 dark:border-white/5 select-none">
      {/* Back Button */}
      <button
        onClick={prevStep}
        disabled={step === 1}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all duration-250 cursor-pointer border",
          step === 1
            ? "opacity-0 pointer-events-none"
            : "border-black/5 bg-white hover:bg-slate-50 text-slate-700 dark:border-white/5 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300"
        )}
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
            : step === 5
            ? "bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700"
            : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        <span>{step === 5 ? "Generate Itinerary" : "Next Step"}</span>
        {step === 5 ? <Sparkles className="size-3.5" /> : <ArrowRight className="size-3.5" />}
      </button>
    </div>
  )
}
