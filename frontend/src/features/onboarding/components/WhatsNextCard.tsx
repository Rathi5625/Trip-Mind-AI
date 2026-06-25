"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"

const NEXT_STEPS = [
  { label: "AI Planner Ready", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800/30" },
  { label: "Budget Optimizer Enabled", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800/30" },
  { label: "Weather Insights Active", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/30 border-sky-100 dark:border-sky-800/30" },
  { label: "Smart Packing Assistant Enabled", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/30 border-violet-100 dark:border-violet-800/30" },
  { label: "Expense Tracker Configured", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800/30" },
]

export function WhatsNextCard() {
  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/80 dark:bg-slate-900/60 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/8 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          🚀 What&apos;s Next?
        </h3>
        <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          Your AI tools are activated and ready
        </p>
      </div>

      {/* Steps list */}
      <div className="space-y-2.5">
        {NEXT_STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15 + i * 0.1,
              type: "spring",
              stiffness: 280,
              damping: 24,
            }}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${step.bg} transition-colors`}
          >
            <div
              className={`flex shrink-0 size-5 items-center justify-center rounded-full ${step.color.replace("text-", "bg-").replace("600", "100").replace("400", "900/30").replace("dark:bg-", "dark:bg-")} border ${step.bg}`}
            >
              <Check className={`size-3 ${step.color}`} strokeWidth={3} />
            </div>
            <span className={`text-xs font-semibold ${step.color}`}>{step.label}</span>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  )
}
