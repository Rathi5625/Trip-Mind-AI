"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Euro, Heart, Compass, Sparkles, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"
import { PromptSuggestion } from "../types/planner"

interface PromptCardProps {
  suggestion: PromptSuggestion
  onClick: () => void
}

export function PromptCard({ suggestion, onClick }: PromptCardProps) {
  // Map icons
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Euro: Euro,
    Heart: Heart,
    Compass: Compass,
    Sparkles: Sparkles,
    Navigation: Navigation,
  }

  const IconComponent = iconMap[suggestion.icon] || Compass

  const colorStyles = {
    Euro: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
    Heart: "text-rose-500 bg-rose-50 dark:bg-rose-950/20",
    Compass: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
    Sparkles: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
    Navigation: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
  }

  const cardGlow = colorStyles[suggestion.icon as keyof typeof colorStyles] || colorStyles.Compass

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-start gap-4 p-4 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 dark:border-white/5 dark:bg-slate-900/60 text-left w-full h-full select-none"
    >
      {/* Icon Box */}
      <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", cardGlow)}>
        <IconComponent className="size-5 stroke-[2]" />
      </div>

      {/* Info */}
      <div className="space-y-1 overflow-hidden">
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
          {suggestion.title}
        </h4>
        <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 leading-normal line-clamp-2">
          {suggestion.description}
        </p>
      </div>
    </motion.button>
  )
}
