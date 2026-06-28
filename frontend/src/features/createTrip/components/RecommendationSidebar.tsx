"use client"

import * as React from "react"
import { Sparkles, Calendar, Wallet, Compass, Award, Train } from "lucide-react"
import { useTripWizardStore } from "../store/tripWizardStore"
import { motion, AnimatePresence } from "framer-motion"

export function RecommendationSidebar() {
  const { hoveredDestination, selectedDestination } = useTripWizardStore()
  
  // Use hovered destination if available, otherwise fall back to selected
  const activeDest = hoveredDestination || selectedDestination

  return (
    <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl w-full select-none gap-5 min-h-[360px]">
      <AnimatePresence mode="wait">
        {activeDest ? (
          <motion.div
            key={activeDest.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-450">
                <Sparkles className="size-4 text-blue-500 fill-blue-500/20" />
                <h4 className="text-xs font-black uppercase tracking-wider">AI Insights</h4>
              </div>
              <span className="text-[9px] font-black text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-full border border-amber-500/10">
                {activeDest.confidence}% Confidence
              </span>
            </div>

            {/* Destination summary heading */}
            <div>
              <span className="text-[8.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">
                Currently Previewing
              </span>
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-0.5 leading-none">
                {activeDest.name}
              </h3>
            </div>

            {/* Metrics Stack */}
            <div className="space-y-3 pt-1">
              {/* Season */}
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-500 shrink-0">
                  <Calendar className="size-3.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-550 leading-none">
                    Best Season
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">
                    {activeDest.bestSeason}
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 shrink-0">
                  <Wallet className="size-3.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-550 leading-none">
                    Est. Base Budget
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">
                    {activeDest.priceRange} / person
                  </span>
                </div>
              </div>

              {/* Popularity */}
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-500 shrink-0">
                  <Award className="size-3.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-550 leading-none">
                    Popularity Score
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${activeDest.popularity}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 leading-none">
                      {activeDest.popularity}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Transport */}
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-500 shrink-0">
                  <Train className="size-3.5" />
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-550 leading-none">
                    Transport Style
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 truncate">
                    {activeDest.transport}
                  </span>
                </div>
              </div>
            </div>

            {/* Attractions tags */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
              <span className="block text-[8.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Top Attractions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeDest.attractions.map((att) => (
                  <span
                    key={att}
                    className="text-[9px] font-bold px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/5"
                  >
                    {att}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 my-auto text-slate-400 space-y-2.5">
            <Compass className="size-8 text-slate-300 dark:text-slate-700 animate-spin" style={{ animationDuration: "12s" }} />
            <div>
              <h5 className="text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-350">
                Explore Destinations
              </h5>
              <p className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500 max-w-[180px] leading-relaxed mt-1 mx-auto">
                Hover over card decks to instantly review seasons, average budget, and itinerary highlights.
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
