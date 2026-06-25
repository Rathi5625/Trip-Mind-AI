"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
  tabIndex?: number
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export function AnimatedCard({
  selected,
  onClick,
  children,
  className,
  tabIndex = 0,
  onKeyDown,
  ...props
}: AnimatedCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      onClick()
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  return (
    <motion.div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn(
        "relative rounded-3xl p-6 border text-center flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
        selected
          ? "bg-blue-50/50 border-[#2563EB] shadow-[0_8px_30px_rgb(37,99,235,0.06)] dark:bg-blue-950/20 dark:border-[#2563EB]/80 dark:shadow-none"
          : "bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:border-slate-200 dark:bg-slate-900/60 dark:border-white/5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:hover:border-white/10",
        className
      )}
      role="checkbox"
      aria-checked={selected}
      {...props}
    >
      {/* Premium Apple liquid glass reflection effect overlay when selected */}
      {selected && (
        <motion.div
          layoutId="liquid-glass-highlight"
          className="absolute inset-0 rounded-inherit bg-gradient-to-tr from-blue-500/5 via-transparent to-white/10 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </motion.div>
  )
}
