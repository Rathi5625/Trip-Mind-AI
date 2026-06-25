"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  className?: string
}

export function AnimatedProgress({ value, className }: AnimatedProgressProps) {
  // Ensure value is bounded between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div
      className={cn(
        "relative w-full h-1 bg-[#2563EB]/15 dark:bg-slate-800 rounded-full overflow-hidden",
        className
      )}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#2563EB] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  )
}
