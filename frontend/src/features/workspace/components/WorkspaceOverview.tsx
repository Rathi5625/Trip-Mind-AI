"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  TrendingDown,
  CloudSun,
  Wallet,
  Calendar,
  Sparkles,
  DollarSign,
  Sun,
  Coins,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Plane,
  Hotel,
  Coffee,
  Train,
  ArrowRight
} from "lucide-react"
import { WorkspaceOverview as OverviewType, ItineraryDay } from "../types/workspace"

interface WorkspaceOverviewProps {
  overview: OverviewType
  timeline: ItineraryDay[]
  onTabChange?: (tab: "Overview" | "Itinerary" | "Bookings" | "Expenses" | "Analytics" | "Settings") => void
}

export function WorkspaceOverview({ overview, timeline, onTabChange }: WorkspaceOverviewProps) {
  const { progress, stats, weather, insights } = overview

  // Circular progress ring parameters
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress.percent / 100) * circumference

  // Roadmap steps
  const roadmapSteps = [
    { label: "Mission Planning", status: "completed", desc: "Itinerary generated and validated" },
    { label: "Pre Departure", status: "active", desc: "Finalizing bookings and checklist" },
    { label: "Tokyo Deployment", status: "upcoming", desc: "Live navigation on trip location" },
    { label: "Return & Debrief", status: "upcoming", desc: "Expense reconciliation" }
  ]

  // Map insight icon name to Lucide components
  const getInsightIcon = (iconName: string) => {
    switch (iconName) {
      case "trending-down":
        return <TrendingDown className="size-5 text-blue-500" />
      case "cloud-sun":
        return <CloudSun className="size-5 text-amber-500" />
      case "wallet":
        return <Wallet className="size-5 text-emerald-500" />
      default:
        return <Sparkles className="size-5 text-indigo-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Grid 1: Progress, Intelligence Forecast, and Mini Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Planning Progress Card (Col Span 4) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-md flex flex-col items-center text-center justify-between min-h-[320px]"
        >
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Planning Progress
            </h3>
            <span className="size-2 rounded-full bg-primary-blue animate-pulse" />
          </div>

          {/* SVG Circular Progress Ring */}
          <div className="relative size-32 flex items-center justify-center my-4">
            <svg className="size-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-primary-blue"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">
                {progress.percent}%
              </span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                READY
              </span>
            </div>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">
              Only {progress.tasksRemaining.length} tasks remaining:
            </p>
            <div className="flex flex-col gap-1.5 text-[11px] font-bold text-slate-650 dark:text-slate-300">
              {progress.tasksRemaining.map((task, idx) => (
                <div key={idx} className="flex items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-800/40 py-1.5 px-3 rounded-lg border border-black/5 dark:border-white/5">
                  <span className="size-1.5 rounded-full bg-primary-blue" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Intelligence Forecast (Col Span 8) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-8 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-primary-blue" />
              Intelligence Forecast
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="bg-slate-50/50 dark:bg-slate-800/20 border border-black/[0.03] dark:border-white/[0.03] rounded-2xl p-4 flex flex-col gap-3 transition-shadow hover:shadow-sm"
                >
                  <div className="size-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0 border border-black/5 dark:border-white/5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">
                      {insight.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mini Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
            {/* Countdown */}
            <div className="flex items-center gap-3 bg-blue-50/30 dark:bg-blue-950/10 p-3.5 rounded-2xl border border-blue-100/20 dark:border-blue-900/10">
              <div className="size-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-blue shadow-sm shrink-0">
                <Calendar className="size-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  COUNTDOWN
                </span>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {stats.countdownDays} Days Remaining
                </p>
              </div>
            </div>

            {/* AI Score */}
            <div className="flex items-center gap-3 bg-violet-50/30 dark:bg-violet-950/10 p-3.5 rounded-2xl border border-violet-100/20 dark:border-violet-900/10">
              <div className="size-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-sm shrink-0">
                <Sparkles className="size-4.5 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  AI SCORE
                </span>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {stats.aiScore}% Efficiency
                </p>
              </div>
            </div>

            {/* Budget Tracker */}
            <div className="flex items-center gap-3 bg-emerald-50/30 dark:bg-emerald-950/10 p-3.5 rounded-2xl border border-emerald-100/20 dark:border-emerald-900/10">
              <div className="size-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm shrink-0">
                <DollarSign className="size-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    BUDGET TRACKER
                  </span>
                  <span className="text-[8px] font-black uppercase bg-emerald-100/60 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">
                    {stats.statusBadge}
                  </span>
                </div>
                <p className="text-xs font-black text-slate-800 dark:text-slate-100 mt-0.5">
                  ${stats.spentBudget.toLocaleString()} <span className="text-[10px] text-slate-400">/ ${stats.totalBudget.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid 2: Destination info, booking status, timeline brief, roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Destination Info + Booking Status) (Col Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Destination info card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {/* Weather */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="size-9 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shrink-0">
                <Sun className="size-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
                  Weather
                </span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {weather.temperature}°C
                </span>
              </div>
            </div>

            {/* Currency */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Coins className="size-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
                  Currency
                </span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {weather.currency}
                </span>
              </div>
            </div>

            {/* Timezone */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-primary-blue flex items-center justify-center shrink-0">
                <Clock className="size-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
                  Timezone
                </span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {weather.timezone}
                </span>
              </div>
            </div>

            {/* Safety Rating */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="size-9 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4.5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block">
                  Safety Rating
                </span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {weather.safetyRating}/10
                </span>
              </div>
            </div>
          </motion.div>

          {/* Booking Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-md flex flex-col gap-4"
          >
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Booking Status
              </h4>
              <p className="text-xs font-black text-slate-700 dark:text-slate-200 mt-1">
                8 out of 10 items confirmed
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-primary-blue h-full rounded-full" style={{ width: "80%" }} />
            </div>

            {/* Icon status row */}
            <div className="flex items-center gap-1.5">
              <div className="size-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                <Plane className="size-3.5" />
              </div>
              <div className="size-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                <Hotel className="size-3.5" />
              </div>
              <div className="size-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                <Train className="size-3.5" />
              </div>
              <div className="size-7 rounded-full bg-slate-100 text-slate-555 dark:bg-slate-800 dark:text-slate-400 flex items-center justify-center border border-black/5">
                <span className="text-[8px] font-black">+5</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Itinerary Timeline Preview) (Col Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Itinerary Preview
              </h3>
              {onTabChange && (
                <button
                  onClick={() => onTabChange("Itinerary")}
                  className="text-[10px] font-black text-primary-blue flex items-center gap-1 hover:underline cursor-pointer"
                >
                  View Details
                  <ArrowRight className="size-3" />
                </button>
              )}
            </div>

            {/* Itinerary Preview Timeline */}
            <div className="relative pl-6 border-l border-slate-100 dark:border-slate-800 space-y-5">
              {timeline.slice(0, 2).map((day, dIdx) => (
                <div key={day.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1 bg-white dark:bg-slate-900 p-0.5 rounded-full">
                    <span className="size-2 bg-primary-blue rounded-full block ring-4 ring-blue-50 dark:ring-blue-950" />
                  </div>

                  <span className="text-[10px] font-black text-slate-450 uppercase block tracking-wider">
                    Day {day.dayNumber} · {day.description}
                  </span>

                  {/* Horizontal list of activities on this day */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {day.activities.slice(0, 2).map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-slate-50/50 dark:bg-slate-800/10 border border-black/[0.02] dark:border-white/[0.02] p-3 rounded-2xl flex items-center gap-3 hover:scale-[1.01] transition-all"
                      >
                        {activity.imageUrl && (
                          <div className="size-11 rounded-xl overflow-hidden shrink-0">
                            <img src={activity.imageUrl} alt={activity.name} className="size-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h5 className="text-[11px] font-black text-slate-800 dark:text-slate-200 truncate">
                            {activity.name}
                          </h5>
                          <span className="text-[9px] font-bold text-slate-400 block mt-0.5">
                            {activity.time} · {activity.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Journey Roadmap (Col Span 3) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-3 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-md"
        >
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-5">
            Journey Roadmap
          </h3>

          <div className="relative pl-6 border-l border-slate-100 dark:border-slate-800 space-y-6">
            {roadmapSteps.map((step, idx) => {
              const isCompleted = step.status === "completed"
              const isActive = step.status === "active"

              return (
                <div key={idx} className="relative">
                  {/* Circle Indicator */}
                  <div className="absolute -left-[32px] top-0 bg-white dark:bg-slate-900 p-0.5 rounded-full">
                    {isCompleted ? (
                      <CheckCircle2 className="size-4.5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950" />
                    ) : isActive ? (
                      <div className="size-4.5 rounded-full bg-primary-blue text-white text-[9px] font-black flex items-center justify-center ring-4 ring-blue-50 dark:ring-blue-950 animate-pulse">
                        2
                      </div>
                    ) : (
                      <div className="size-4.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 text-[9px] font-black flex items-center justify-center">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className={`text-xs font-black leading-tight ${isActive ? "text-primary-blue" : isCompleted ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}>
                      {step.label}
                    </h4>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
