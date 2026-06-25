"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Calendar, Thermometer, CloudSun } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { AnimatedProgress } from "@/components/ui/AnimatedProgress"

export interface FirstTripData {
  label: string          // e.g. "14 Days in Japan"
  estimatedBudget: string
  bestTime: string       // e.g. "April"
  weatherRange: string   // e.g. "18°C–24°C"
  confidence: number
  flag: string
}

interface FirstTripPreviewProps {
  trip: FirstTripData
}

function CountUp({ to, delay = 0 }: { to: number; delay?: number }) {
  const [val, setVal] = React.useState(0)

  React.useEffect(() => {
    const start = performance.now()
    const dur = 1000

    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * to))
      if (t < 1) requestAnimationFrame(tick)
    }

    const id = setTimeout(() => requestAnimationFrame(tick), delay * 1000)
    return () => clearTimeout(id)
  }, [to, delay])

  return <>{val}</>
}

export function FirstTripPreview({ trip }: FirstTripPreviewProps) {
  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-gradient-to-br from-blue-600/90 to-indigo-700/90 dark:from-blue-700/80 dark:to-indigo-800/80 border-blue-500/30 dark:border-blue-400/10 shadow-2xl shadow-blue-500/20 rounded-3xl relative overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-300/10 rounded-full blur-xl pointer-events-none" />

      {/* AI badge */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 mb-4"
      >
        <Sparkles className="size-3" />
        AI Generated
      </motion.div>

      {/* Trip title */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2.5 mb-5"
      >
        <span className="text-3xl leading-none">{trip.flag}</span>
        <div>
          <h3 className="text-lg font-black text-white leading-tight">{trip.label}</h3>
          <p className="text-blue-200 text-xs font-medium mt-0.5">First Recommended Trip</p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/10"
        >
          <div className="text-[9px] font-bold tracking-wider text-blue-200 uppercase mb-1">
            Est. Budget
          </div>
          <div className="text-base font-black text-white">{trip.estimatedBudget}</div>
        </motion.div>

        {/* Best time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/10"
        >
          <div className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase mb-1">
            <Calendar className="size-2.5" />
            Best Time
          </div>
          <div className="text-base font-black text-white">{trip.bestTime}</div>
        </motion.div>

        {/* Weather */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/10"
        >
          <div className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase mb-1">
            <Thermometer className="size-2.5" />
            Weather
          </div>
          <div className="text-sm font-black text-white">{trip.weatherRange}</div>
        </motion.div>

        {/* Confidence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/10"
        >
          <div className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-blue-200 uppercase mb-1">
            <CloudSun className="size-2.5" />
            Confidence
          </div>
          <div className="text-base font-black text-emerald-300">
            <CountUp to={trip.confidence} delay={0.5} />%
          </div>
        </motion.div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
            AI Match Confidence
          </span>
          <span className="text-xs font-black text-emerald-300">
            <CountUp to={trip.confidence} delay={0.55} />%
          </span>
        </div>
        <div className="h-2 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${trip.confidence}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          />
        </div>
      </div>
    </GlassPanel>
  )
}
