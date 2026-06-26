"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Hourglass, AlertCircle, TrendingDown, Hotel, Plane } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { TimelineEvent } from "../types/dashboard"

interface TravelTimelineProps {
  events: TimelineEvent[]
}

export function TravelTimeline({ events }: TravelTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "warning":
        return {
          icon: AlertCircle,
          color: "text-amber-500 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/35",
        }
      case "info":
        return {
          icon: TrendingDown,
          color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/35",
        }
      case "success":
        return {
          icon: Hotel,
          color: "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/35",
        }
      case "alert":
        return {
          icon: Plane,
          color: "text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/35",
        }
      default:
        return {
          icon: Hourglass,
          color: "text-slate-500 bg-slate-50 border-slate-100 dark:bg-slate-800/40 dark:border-slate-800/60",
        }
    }
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
  }

  return (
    <GlassPanel
      glowColor="none"
      className="p-6 bg-white dark:bg-slate-900/60 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl h-full select-none"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-inner">
          <Hourglass className="size-4 stroke-[2.5]" />
        </div>
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
          Smart Travel Timeline
        </h3>
      </div>

      {/* Timeline entries */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 pl-6 space-y-6"
      >
        {events.map((event) => {
          const config = getEventIcon(event.type)
          const EventIcon = config.icon

          return (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[35px] top-1 flex items-center justify-center z-10">
                <div className={`flex size-6 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm ${config.color}`}>
                  <EventIcon className="size-3 stroke-[2.5]" />
                </div>
              </div>

              {/* Event details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/5">
                    {event.timeLabel}
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 leading-tight group-hover:text-primary-blue dark:group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 leading-normal">
                  {event.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </GlassPanel>
  )
}
