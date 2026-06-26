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
      className="space-y-4 select-none w-full scroll-mt-20"
    >
      {/* Day Title Row */}
      <div className="flex items-center gap-2 px-1 py-2">
        <Calendar className="size-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Day {dayPlan.dayNumber}: {dayPlan.title}
        </h3>
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
