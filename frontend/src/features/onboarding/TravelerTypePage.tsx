"use client"

import * as React from "react"
import { useTravelerType } from "./hooks/useTravelerType"
import { PageHeader } from "./components/PageHeader"
import { TravelerGrid } from "./components/TravelerGrid"
import { SelectionSummary } from "./components/SelectionSummary"
import { AIHint } from "./components/AIHint"
import { AIPersonalizationPreview } from "./components/AIPersonalizationPreview"
import { NavigationButtons } from "./components/NavigationButtons"
import { ProgressIndicator } from "@/components/ui/ProgressIndicator"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { AnimatePresence } from "framer-motion"

export default function TravelerTypePage() {
  const {
    selectedTypes,
    toggleTravelerType,
    selectedNames,
    isValid,
    handleNext,
    handleBack,
  } = useTravelerType()

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-8 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans overflow-y-auto pb-24 md:pb-8">
      {/* Dynamic Dotted Wavy Lines SVG Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70 dark:opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavy-pattern-step2" width="200" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 0 60 Q 50 30, 100 60 T 200 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-250 dark:text-slate-800"
              />
              <path
                d="M 0 100 Q 50 70, 100 100 T 200 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-250 dark:text-slate-800"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavy-pattern-step2)" />
        </svg>
      </div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-30">
        <ThemeToggle />
      </div>

      {/* Top Progress bar */}
      <div className="w-full flex flex-col items-center justify-center gap-2 pt-4 select-none mb-10">
        <span className="block text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
          Step 2 of 5
        </span>
        <ProgressIndicator value={40} className="w-full max-w-[200px] sm:max-w-[240px] h-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Card Content Shell */}
      <div className="my-auto w-full max-w-4xl mx-auto z-10 py-4">
        {/* Page Header Question */}
        <PageHeader />

        {/* 8-Card Selection Grid */}
        <TravelerGrid
          selectedTypes={selectedTypes}
          onToggleType={toggleTravelerType}
        />

        {/* Selection summary list text */}
        <SelectionSummary selectedNames={selectedNames} />

        {/* AI personalization preview / hint banner */}
        <AnimatePresence mode="wait">
          {selectedTypes.length > 0 ? (
            <AIPersonalizationPreview key="ai-preview" selectedTypes={selectedTypes} />
          ) : (
            <AIHint key="ai-hint" />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation buttons */}
      <NavigationButtons
        isValid={isValid}
        onNext={handleNext}
        onSkip={handleBack}
        prevLabel="Back"
      />
    </div>
  )
}
