"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Globe2, CheckCircle2, Calendar } from "lucide-react"

export interface StatisticsCardProps {
  label: string
  value: number
  iconName: string
  description?: string
}

// Helper to count numbers on mount
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    const start = performance.now()
    const duration = 1200 // 1.2s

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplayValue(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <span>{displayValue}</span>
}

export function StatisticsCard({
  label,
  value,
  iconName,
  description,
}: StatisticsCardProps) {
  // Map icons
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Globe2: Globe2,
    CheckCircle2: CheckCircle2,
    Calendar: Calendar,
  }

  const IconComponent = iconMap[iconName] || Globe2

  const colorStyles: Record<string, string> = {
    Globe2: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
    CheckCircle2: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
    Calendar: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
  }

  const iconColor = colorStyles[iconName] || colorStyles.Globe2

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="flex flex-col items-center justify-center p-5 rounded-2xl border border-black/5 bg-white text-center shadow-sm dark:border-white/5 dark:bg-slate-900/60 select-none h-full"
    >
      {/* Icon Box */}
      <div className={`flex size-10 items-center justify-center rounded-xl mb-3 shrink-0 ${iconColor}`}>
        <IconComponent className="size-5 stroke-[2.5]" />
      </div>

      {/* Counter */}
      <span className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1">
        <AnimatedNumber value={value} />
      </span>

      {/* Label */}
      <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        {label}
      </span>
      
      {description && (
        <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-1">
          {description}
        </span>
      )}
    </motion.div>
  )
}
