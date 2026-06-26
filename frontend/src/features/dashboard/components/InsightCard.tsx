"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingDown, Sun, Info, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InsightCardProps {
  type: "price" | "weather" | "general"
  badgeText: string
  badgeType: "price-drop" | "optimal-time" | "info"
  content: string
  actionText: string
  actionLink: string
  iconName: string
}

export function InsightCard({
  type,
  badgeText,
  badgeType,
  content,
  actionText,
  actionLink,
  iconName,
}: InsightCardProps) {
  // Map icons
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    TrendingDown: TrendingDown,
    Sun: Sun,
    Info: Info,
  }

  const IconComponent = iconMap[iconName] || Info

  const badgeStyles = {
    "price-drop": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    "optimal-time": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    info: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  }

  const iconStyles = {
    price: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
    weather: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
    general: "text-slate-500 bg-slate-50 dark:bg-slate-800/50",
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="flex flex-col justify-between p-5 rounded-2xl border border-black/5 bg-white/40 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-slate-900/40 hover:shadow-md transition-shadow select-none h-full"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", iconStyles[type])}>
          <IconComponent className="size-5 stroke-[2.5]" />
        </div>
        <span className={cn("text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full", badgeStyles[badgeType])}>
          {badgeText}
        </span>
      </div>

      {/* Message */}
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
        {content}
      </p>

      {/* Footer Link */}
      <a
        href={actionLink}
        onClick={(e) => {
          e.preventDefault()
          alert(`Simulating redirection to ${actionLink}`)
        }}
        className="group/btn inline-flex items-center gap-1 text-xs font-bold text-primary-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        {actionText}
        <ArrowRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
      </a>
    </motion.div>
  )
}
