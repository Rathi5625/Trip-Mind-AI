"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronRight, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Trip } from "../types/dashboard"

import { useRouter } from "next/navigation"

interface TripCardProps {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  const router = useRouter()

  const statusStyles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
    warning: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
    danger: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
    info: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30",
  }

  const handleCardClick = () => {
    router.push(`/workspace/${trip.id}`)
  }

  // Display top time badge
  const displayTimeBadge = () => {
    if (trip.daysToGo === undefined) return null
    if (trip.daysToGo <= 15) {
      return `In ${trip.daysToGo} Days`
    }
    const months = Math.round(trip.daysToGo / 30)
    return `In ${months} Month${months > 1 ? "s" : ""}`
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between p-5 rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-md cursor-pointer select-none transition-all dark:border-white/5 dark:bg-slate-900/40 min-h-[220px]"
    >
      {/* Top row: Timeline badge and Quick action arrow */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/40 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/5">
          {displayTimeBadge()}
        </span>

        <div className="flex size-7 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/40 border border-black/5 dark:border-white/5 group-hover:bg-primary-blue group-hover:text-white dark:group-hover:bg-primary-blue text-slate-400 dark:text-slate-500 transition-colors shrink-0">
          <ChevronRight className="size-4 stroke-[2.5]" />
        </div>
      </div>

      {/* Middle row: Destination & Dates */}
      <div className="mb-6">
        <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-primary-blue dark:group-hover:text-blue-400 transition-colors truncate">
          {trip.destination}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">
          <Calendar className="size-3.5 stroke-[2]" />
          <span>
            {trip.startDate} - {trip.endDate}
          </span>
        </div>
      </div>

      {/* Bottom row: Travelers Avatars & Status Badge */}
      <div className="flex items-center justify-between border-t border-slate-50 dark:border-white/5 pt-3 mt-auto">
        {/* Avatars group */}
        <div className="flex items-center">
          {trip.travelers.slice(0, 3).map((traveler, index) => (
            <div
              key={traveler.name}
              className={cn(
                "flex size-6.5 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 text-[10px] font-black text-white shrink-0 shadow-sm",
                index === 0 ? "bg-primary-blue" : index === 1 ? "bg-emerald-500" : "bg-purple-500",
                index > 0 && "-ml-2"
              )}
              title={traveler.name}
            >
              {traveler.initials}
            </div>
          ))}
          {trip.travelers.length > 3 && (
            <div className="flex size-6.5 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-[9px] font-extrabold shrink-0 -ml-2 select-none shadow-sm">
              +{trip.travelers.length - 3}
            </div>
          )}
        </div>

        {/* Status indicator badge */}
        <div className="flex items-center gap-1.5">
          <span className={cn("text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border", statusStyles[trip.statusType])}>
            {trip.status}
          </span>
          {trip.status === "Action Needed" && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white animate-pulse">
              Action Needed
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
