"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { TravelScore } from "../types/dashboard"

interface AITravelScoreProps {
  score: TravelScore
}

function AnimatedProgressRing({ percentage }: { percentage: number }) {
  // SVG Stroke math
  const radius = 32
  const stroke = 6
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const [offset, setOffset] = React.useState(circumference)

  React.useEffect(() => {
    // Animate stroke offset on load
    const timer = setTimeout(() => {
      setOffset(strokeDashoffset)
    }, 200)
    return () => clearTimeout(timer)
  }, [strokeDashoffset, circumference])

  return (
    <div className="relative size-20 flex items-center justify-center shrink-0">
      <svg className="size-full -rotate-90">
        {/* Track circle */}
        <circle
          stroke="rgba(37, 99, 235, 0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="dark:stroke-white/5"
        />
        {/* Progress circle */}
        <motion.circle
          stroke="#2563EB"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset: offset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center percentage */}
      <span className="absolute text-sm font-black text-slate-800 dark:text-slate-100">
        {percentage}%
      </span>
    </div>
  )
}

export function AITravelScore({ score }: AITravelScoreProps) {
  const getItemIcon = (status: string) => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle2,
          color: "text-emerald-500",
        }
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-amber-500",
        }
      default:
        return {
          icon: HelpCircle,
          color: "text-slate-400",
        }
    }
  }

  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/70 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl h-full select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-inner">
            <Sparkles className="size-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
              Travel Readiness
            </h3>
          </div>
        </div>
      </div>

      {/* Progress ring card row */}
      <div className="flex items-center gap-4 bg-slate-50/50 border border-black/5 dark:bg-slate-950/20 dark:border-white/5 p-3 rounded-2xl mb-4">
        <AnimatedProgressRing percentage={score.readiness} />
        <div>
          <span className="text-xs font-black text-slate-700 dark:text-slate-350 block">
            Readiness Index
          </span>
          <span className="text-[10px] font-semibold text-slate-450 dark:text-slate-500 leading-tight block mt-0.5">
            Your travel checklist is optimized. Correct warning tasks before travel.
          </span>
        </div>
      </div>

      {/* Checklists */}
      <div className="space-y-2.5">
        {score.checklist.map((item) => {
          const config = getItemIcon(item.status)
          const ItemIcon = config.icon

          return (
            <div key={item.id} className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <ItemIcon className={`size-4 shrink-0 ${config.color}`} />
                <span className="text-slate-650 dark:text-slate-350">
                  {item.text}
                </span>
              </div>
              <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-md ${
                item.status === "success"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/15 dark:text-emerald-400"
                  : "bg-amber-50 text-amber-600 dark:bg-amber-950/15 dark:text-amber-400"
              }`}>
                {item.status === "success" ? "Verified" : "Pending"}
              </span>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}
