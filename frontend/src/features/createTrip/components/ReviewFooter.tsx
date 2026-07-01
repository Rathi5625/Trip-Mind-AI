"use client"

import * as React from "react"
import { ArrowLeft, Save, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTravelDatesStore } from "../store/travelDatesStore"
import { useBudgetStore } from "../store/budgetStore"
import { useTravelersStore } from "../store/travelersStore"
import { usePreferencesStore } from "../store/preferencesStore"

interface ReviewFooterProps {
  onGenerate: () => void
  isGenerating: boolean
}

export function ReviewFooter({ onGenerate, isGenerating }: ReviewFooterProps) {
  const router = useRouter()

  // Reset actions
  const resetDates = useTravelDatesStore((state) => state.resetDatesStore)
  const resetBudget = useBudgetStore((state) => state.resetBudgetStore)
  const resetTravelers = useTravelersStore((state) => state.resetTravelersStore)
  const resetPreferences = usePreferencesStore((state) => state.resetPreferencesStore)

  const handleBack = () => {
    router.push("/planner/create-trip/preferences")
  }

  const handleSaveDraft = () => {
    alert("✨ Draft Saved! You can resume customizing your trip plan from your dashboard at any time.")
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all selected trip details? This action cannot be undone.")) {
      resetDates()
      resetBudget()
      resetTravelers()
      resetPreferences()
      router.push("/planner/create-trip")
    }
  }

  return (
    <div className="w-full select-none max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl">
      {/* Back Button */}
      <button
        onClick={handleBack}
        disabled={isGenerating}
        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-655 bg-white hover:bg-slate-50 border border-black/5 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-white/5 dark:text-slate-355 transition-colors cursor-pointer disabled:opacity-50"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back</span>
      </button>

      {/* Middle Readouts / Actions */}
      <div className="flex w-full sm:w-auto items-center justify-center gap-4">
        {/* Save Draft */}
        <button
          onClick={handleSaveDraft}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-205 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="size-3.5" />
          <span>Save Draft</span>
        </button>

        {/* Reset Wizard */}
        <button
          onClick={handleReset}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-rose-500 hover:text-rose-700 dark:text-rose-455 dark:hover:text-rose-350 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RotateCcw className="size-3.5" />
          <span>Reset Wizard</span>
        </button>
      </div>

      {/* Mobile Sticky Button Note:
          We can render the Generate Plan button here on mobile viewports for a sticky feel,
          but we also want it rendered on the right sidebar on desktop as per the layout.
          To keep things simple and functional, we render it directly in the page sidebar on desktop,
          and we let the footer stay clean, or we can render a mobile-only generate button inside this footer that is sticky at the bottom!
          Let's include a mobile-only button class if needed or keep it unified.
      */}
    </div>
  )
}
