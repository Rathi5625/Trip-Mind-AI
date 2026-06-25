"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { Destination } from "../types/destination"

interface DestinationShowcaseProps {
  destinations: Destination[]
}

export function DestinationShowcase({ destinations }: DestinationShowcaseProps) {
  if (destinations.length === 0) return null

  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/80 dark:bg-slate-900/60 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          🌍 Dream Destinations
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
          {destinations.length} destination{destinations.length !== 1 ? "s" : ""} selected for your itinerary
        </p>
      </div>

      {/* Destination list */}
      <div className="space-y-3">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, ease: "easeOut" }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5"
          >
            {/* Destination image */}
            <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Destination info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none">{dest.flag}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  {dest.name}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  Best: {dest.bestSeason}
                </span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  {dest.averageBudget}
                </span>
              </div>
            </div>

            {/* AI Match badge */}
            <div className="shrink-0 flex flex-col items-end">
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                {dest.aiMatch}%
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wide">
                AI Match
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  )
}
