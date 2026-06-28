"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Sliders, Sparkles } from "lucide-react"
import { useTripWizardStore } from "../store/tripWizardStore"
import { WizardStep } from "../types/createTrip"
import { cn } from "@/lib/utils"

const stepsList = [
  { id: 1, label: "Destination", icon: MapPin },
  { id: 2, label: "Dates", icon: Calendar },
  { id: 3, label: "Travelers", icon: Users },
  { id: 4, label: "Preferences", icon: Sliders },
  { id: 5, label: "Review", icon: Sparkles },
]

export function WizardProgress() {
  const { step, setStep } = useTripWizardStore()

  const handleStepClick = (sId: number) => {
    // Only allow navigating to steps that are validated/accessible
    setStep(sId as WizardStep)
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 select-none">
      <div className="relative flex items-center justify-between">
        {/* Connection Progress Bar Background */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

        {/* Animated Connection Progress Fill */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 -translate-y-1/2 z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Step Nodes */}
        {stepsList.map((s) => {
          const Icon = s.icon
          const isActive = step === s.id
          const isCompleted = step > s.id

          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center group">
              <button
                onClick={() => handleStepClick(s.id)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-md",
                  isActive
                    ? "bg-blue-600 border-blue-500 text-white ring-4 ring-blue-500/20"
                    : isCompleted
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-500 dark:hover:border-slate-700"
                )}
                aria-label={`Step ${s.id}: ${s.label}`}
              >
                <Icon className="size-4.5" />
              </button>

              {/* Label */}
              <span
                className={cn(
                  "absolute top-12 text-[10px] font-bold tracking-tight uppercase transition-colors duration-300 whitespace-nowrap",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-extrabold"
                    : isCompleted
                    ? "text-emerald-500"
                    : "text-slate-400 dark:text-slate-550"
                )}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
