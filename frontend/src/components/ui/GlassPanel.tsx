"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean
  glowColor?: "blue" | "pink" | "none"
}

export function GlassPanel({
  className,
  hoverEffect = false,
  glowColor = "none",
  children,
  ...props
}: GlassPanelProps) {
  const glowStyles = {
    blue: "before:absolute before:-inset-px before:rounded-inherit before:bg-gradient-to-r before:from-blue-500/10 before:to-indigo-500/10 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
    pink: "before:absolute before:-inset-px before:rounded-inherit before:bg-gradient-to-r before:from-rose-500/10 before:to-pink-500/10 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
    none: "",
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300",
        "border-white/40 dark:border-white/5",
        "dark:bg-dark-navy/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
        hoverEffect && "hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
        glowColor !== "none" && glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
