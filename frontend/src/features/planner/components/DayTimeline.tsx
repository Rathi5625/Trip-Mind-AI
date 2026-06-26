"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { DayPlan } from "../types/itinerary"
import { TimelineNode } from "./TimelineNode"
import { ActivityCard } from "./ActivityCard"
import { motion } from "framer-motion"

interface DayTimelineProps {
  dayPlan: DayPlan
  isMobile?: boolean
}

export function DayTimeline({ dayPlan, isMobile = false }: DayTimelineProps) {
  return (
    <div
      id={`day-section-${dayPlan.dayNumber}`}
      className="space-y-4 select-none w-full scroll-mt-20 animate-none"
    >
      {/* Day Title Row */}
      <div className="flex items-center justify-between px-1 py-1 border-b border-slate-100/50 dark:border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="size-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Day {dayPlan.dayNumber}: {dayPlan.title}
          </h3>
        </div>
      </div>

      {/* Daily Progress Statistics Panel */}
      <div className="grid grid-cols-4 gap-2.5 p-4 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 text-[10px] font-bold text-slate-500 dark:text-slate-400">
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">Activities</span>
          <span className="text-xs font-black text-slate-850 dark:text-slate-200">{dayPlan.completedCount}/{dayPlan.activities.length}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">Walking</span>
          <span className="text-xs font-black text-slate-850 dark:text-slate-200">{dayPlan.walkingDistance}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-black uppercase text-slate-455 dark:text-slate-500 tracking-wider">Est. Cost</span>
          <span className="text-xs font-black text-blue-600 dark:text-blue-400">
            ¥{dayPlan.activities.reduce((sum, act) => sum + act.cost, 0).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-black uppercase text-slate-455 dark:text-slate-500 tracking-wider">Time Planned</span>
          <span className="text-xs font-black text-slate-850 dark:text-slate-200">{dayPlan.timeRange}</span>
        </div>
      </div>

      {/* Activities Vertical Node Stack */}
      <div className="flex flex-col w-full">
        {dayPlan.activities.map((activity, index) => {
          const isLast = index === dayPlan.activities.length - 1

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex gap-4 w-full items-stretch min-h-[140px]"
            >
              {/* Left Side Connection Nodes */}
              <TimelineNode
                category={activity.category}
                isLast={isLast}
              />

              {/* Right Side Activity Card */}
              <div className="flex-1 pb-6">
                <ActivityCard activity={activity} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
