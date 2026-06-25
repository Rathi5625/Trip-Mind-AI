"use client"

import * as React from "react"
import { AnimatedProgress } from "@/components/ui/AnimatedProgress"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  progressPercent: number
}

export function ProgressBar({
  currentStep,
  totalSteps,
  progressPercent,
}: ProgressBarProps) {
  return (
    <div className="w-full max-w-[200px] sm:max-w-[240px] mx-auto text-center space-y-2 select-none">
      <span className="block text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
        Step {currentStep} of {totalSteps}
      </span>
      <AnimatedProgress value={progressPercent} className="h-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  )
}
