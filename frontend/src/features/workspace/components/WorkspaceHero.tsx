"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Edit3, Share2, Sparkles } from "lucide-react"
import { useDashboardStore } from "../../dashboard/hooks/useDashboard"

interface WorkspaceHeroProps {
  title: string
  destinationName: string
  startDate: string
  endDate: string
  duration: number
  travelersCount: number
  onEditClick?: () => void
  onShareClick?: () => void
  onAskAiClick?: () => void
}

export function WorkspaceHero({
  title,
  destinationName,
  startDate,
  endDate,
  duration,
  travelersCount,
  onEditClick,
  onShareClick,
  onAskAiClick
}: WorkspaceHeroProps) {
  const { setAIOpen } = useDashboardStore()

  // Format dates nicely
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString("en-US", { day: "numeric", month: "short" })
    } catch (e) {
      return dateStr
    }
  }

  const dateRangeStr = `${formatDate(startDate)} – ${formatDate(endDate)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-gradient-to-tr from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-900/40 backdrop-blur-xl p-8 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
    >
      {/* City Background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.03] dark:opacity-[0.06] pointer-events-none bg-[url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center" />

      {/* Left Metadata details */}
      <div className="space-y-4">
        {/* Status Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
            READY TO TRAVEL
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
          {title}
        </h1>

        {/* Details list */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-bold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 text-primary-blue" />
            <span>{destinationName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-primary-blue" />
            <span>{dateRangeStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-4 text-primary-blue" />
            <span>
              {duration} Days · {travelersCount} Traveler{travelersCount > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Right Actions Buttons */}
      <div className="flex flex-wrap items-center gap-3 self-start lg:self-center shrink-0">
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 bg-primary-blue hover:bg-blue-600 text-white rounded-2xl py-3 px-5 text-xs font-black shadow-md hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
        >
          <Edit3 className="size-4" />
          Edit Trip
        </button>

        <button
          onClick={onShareClick}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:text-slate-200 dark:border-slate-700 rounded-2xl py-3 px-5 text-xs font-black shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
        >
          <Share2 className="size-4 text-slate-500" />
          Share
        </button>

        <button
          onClick={() => {
            setAIOpen(true)
            if (onAskAiClick) onAskAiClick()
          }}
          className="flex items-center gap-2 bg-blue-50/70 hover:bg-blue-100/70 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 text-primary-blue dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 rounded-2xl py-3 px-5 text-xs font-black shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
        >
          <Sparkles className="size-4" />
          Ask AI
        </button>
      </div>
    </motion.div>
  )
}
