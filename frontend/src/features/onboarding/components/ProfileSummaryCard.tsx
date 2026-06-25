"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Pencil } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"

interface ProfileRow {
  label: string
  value: string
}

interface ProfileSummaryCardProps {
  travelerTypeLabels: string[]
  travelerTypeEmojis: string[]
  budgetLabel: string
  budgetRange: string
  durationLabel: string
  groupLabel: string
  paceLabel: string
  onEdit: () => void
}

export function ProfileSummaryCard({
  travelerTypeLabels,
  travelerTypeEmojis,
  budgetLabel,
  budgetRange,
  durationLabel,
  groupLabel,
  paceLabel,
  onEdit,
}: ProfileSummaryCardProps) {
  const rows: ProfileRow[] = [
    { label: "Budget", value: budgetRange ? `${budgetLabel} · ${budgetRange}` : budgetLabel },
    { label: "Duration", value: durationLabel },
    { label: "Group", value: groupLabel },
    { label: "Travel Pace", value: paceLabel },
  ]

  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/80 dark:bg-slate-900/60 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl relative overflow-hidden"
    >
      {/* Ambient top-right glow */}
      <div className="absolute -top-8 -right-8 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            🤖 Your Travel Profile
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
            AI-personalized based on your answers
          </p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
          aria-label="Edit profile"
        >
          <Pencil className="size-3.5" />
          Edit
        </button>
      </div>

      {/* Traveler Type block */}
      <div className="flex flex-wrap gap-2 mb-5">
        {travelerTypeLabels.map((label, i) => (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/30"
          >
            <span className="text-sm leading-none">{travelerTypeEmojis[i]}</span>
            {label}
          </motion.span>
        ))}
      </div>

      {/* Profile rows */}
      <div className="space-y-3 divide-y divide-slate-50 dark:divide-slate-800/60">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07, ease: "easeOut" }}
            className="flex items-center justify-between pt-3 first:pt-0"
          >
            <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              {row.label}
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  )
}
