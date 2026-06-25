"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { AnimatedProgress } from "@/components/ui/AnimatedProgress"

interface AIConfidencePanelProps {
  estimatedBudget: string
  aiConfidence: number
  focusAreas: string[]
}

export function AIConfidencePanel({
  estimatedBudget,
  aiConfidence,
  focusAreas,
}: AIConfidencePanelProps) {
  // Animated count-up for confidence number
  const [displayedConfidence, setDisplayedConfidence] = React.useState(0)

  React.useEffect(() => {
    const start = 0
    const end = aiConfidence
    const duration = 1200
    const stepTime = 16
    const steps = Math.ceil(duration / stepTime)
    const increment = end / steps
    let current = start
    let frame = 0

    const timer = setInterval(() => {
      frame++
      current = Math.min(Math.round(start + increment * frame), end)
      setDisplayedConfidence(current)
      if (current >= end) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [aiConfidence])

  const confidenceColor =
    aiConfidence >= 90
      ? "text-emerald-600 dark:text-emerald-400"
      : aiConfidence >= 75
      ? "text-blue-600 dark:text-blue-400"
      : "text-amber-600 dark:text-amber-400"

  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-gradient-to-br from-blue-50/60 to-white/80 dark:from-slate-900/80 dark:to-slate-900/60 border-blue-100/50 dark:border-white/5 shadow-lg rounded-3xl relative overflow-hidden"
    >
      {/* Glow blobs */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-inner">
          <Sparkles className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            AI Personalization Score
          </h3>
          <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
            Based on your complete travel profile
          </p>
        </div>
      </div>

      {/* Confidence score */}
      <div className="flex items-end gap-3 mb-4">
        <motion.span
          key={displayedConfidence}
          className={`text-4xl font-black tracking-tight ${confidenceColor}`}
        >
          {displayedConfidence}%
        </motion.span>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 pb-1">
          Confidence
        </span>
      </div>
      <AnimatedProgress
        value={aiConfidence}
        className="h-2 mb-6 bg-slate-100 dark:bg-slate-800"
      />

      {/* Budget estimate */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 mb-4">
        <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          Est. Budget
        </span>
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm font-extrabold text-blue-600 dark:text-blue-400"
        >
          {estimatedBudget}
        </motion.span>
      </div>

      {/* Focus Areas */}
      <div>
        <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-2.5">
          AI Focus Areas
        </span>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 280, damping: 20 }}
              className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800/30"
            >
              ✓ {area}
            </motion.span>
          ))}
        </div>
      </div>
    </GlassPanel>
  )
}
