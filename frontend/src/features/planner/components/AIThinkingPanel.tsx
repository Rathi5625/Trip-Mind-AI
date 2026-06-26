"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bot, Check, Loader2 } from "lucide-react"

export function AIThinkingPanel() {
  const steps = [
    "Understanding Preferences",
    "Checking Flight Prices",
    "Analyzing Weather",
    "Finding Hotels",
    "Building Itinerary",
    "Optimizing Budget",
  ]

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)

  React.useEffect(() => {
    // Automatically increment the thinking step index over 1.2 seconds to simulate active work
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          return prev
        }
      })
    }, 220) // ~220ms per step simulation

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="flex gap-4 p-5 rounded-3xl border border-black/5 bg-white shadow-md dark:border-white/5 dark:bg-slate-900/60 max-w-[85%] rounded-tl-none select-none mb-6"
    >
      {/* Bot Icon */}
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-blue to-violet-600 text-white shadow-md shadow-blue-500/10">
        <Bot className="size-4.5 stroke-[2] animate-pulse" />
      </div>

      <div className="space-y-3.5 flex-1">
        <div>
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>🤖 Planning Your Trip...</span>
          </h4>
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
            AI is analyzing seasonal travel deals and routes
          </p>
        </div>

        {/* Steps checklist */}
        <div className="space-y-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex
            const isActive = idx === currentStepIndex

            return (
              <div
                key={step}
                className={`flex items-center gap-2.5 text-xs font-semibold transition-colors duration-300 ${
                  isCompleted
                    ? "text-emerald-500 dark:text-emerald-400"
                    : isActive
                    ? "text-primary-blue dark:text-blue-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {/* Loader or Check icon */}
                <div className="shrink-0 size-4.5 flex items-center justify-center">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="size-4 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450"
                    >
                      <Check className="size-2.5 stroke-[3]" />
                    </motion.div>
                  ) : isActive ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <div className="size-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                  )}
                </div>

                <span>{step}</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
