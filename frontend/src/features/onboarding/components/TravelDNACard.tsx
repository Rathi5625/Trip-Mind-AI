"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"

export interface DNADimension {
  label: string
  score: number
  color: string
  bgColor: string
  emoji: string
}

interface TravelDNACardProps {
  explorerScore: number
  dimensions: DNADimension[]
}

function AnimatedBar({ score, color, delay }: { score: number; color: string; delay: number }) {
  return (
    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      />
    </div>
  )
}

function AnimatedScore({ value, delay }: { value: number; delay: number }) {
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    const start = performance.now()
    const dur = 900

    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      // ease out
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) requestAnimationFrame(tick)
    }

    const id = setTimeout(() => requestAnimationFrame(tick), delay * 1000)
    return () => clearTimeout(id)
  }, [value, delay])

  return <span>{display}%</span>
}

export function TravelDNACard({ explorerScore, dimensions }: TravelDNACardProps) {
  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/80 dark:bg-slate-900/60 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl relative overflow-hidden"
    >
      {/* Purple glow accent */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-500/8 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 shadow-inner">
          <Brain className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            🧠 AI Travel DNA
          </h3>
          <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
            Your unique travel personality fingerprint
          </p>
        </div>

        {/* Explorer score badge */}
        <div className="ml-auto text-right shrink-0">
          <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
            <AnimatedScore value={explorerScore} delay={0.3} />
          </div>
          <div className="text-[9px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Explorer Score
          </div>
        </div>
      </div>

      {/* Dimension bars */}
      <div className="space-y-3.5">
        {dimensions.map((dim, i) => (
          <motion.div
            key={dim.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.08, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            {/* Label */}
            <div className="w-24 shrink-0 flex items-center gap-1.5">
              <span className="text-sm leading-none">{dim.emoji}</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate">
                {dim.label}
              </span>
            </div>

            {/* Bar */}
            <AnimatedBar score={dim.score} color={dim.color} delay={0.35 + i * 0.08} />

            {/* Score */}
            <div
              className="w-10 text-right shrink-0 text-xs font-extrabold"
              style={{ color: dim.color }}
            >
              <AnimatedScore value={dim.score} delay={0.35 + i * 0.08} />
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  )
}
