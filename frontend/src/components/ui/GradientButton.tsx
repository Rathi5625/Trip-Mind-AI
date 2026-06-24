"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "accent" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const sizeStyles = {
      sm: "px-4 py-1.5 text-xs font-semibold rounded-full",
      md: "px-6 py-2.5 text-sm font-semibold rounded-full",
      lg: "px-8 py-3.5 text-base font-semibold rounded-full",
    }

    const variantStyles = {
      primary: cn(
        "bg-primary-blue text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30",
        "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:animate-[shimmer_1.5s_infinite]",
        "dark:shadow-blue-500/10"
      ),
      secondary: cn(
        "bg-white/80 border border-white/40 text-foreground shadow-sm backdrop-blur-md",
        "hover:bg-white hover:border-white/60",
        "dark:bg-white/10 dark:border-white/10 dark:text-white dark:hover:bg-white/15"
      ),
      accent: cn(
        "bg-gradient-to-r from-[#E9D5C3] to-[#D6A89C] text-slate-800 shadow-md",
        "hover:brightness-105",
        "dark:text-slate-900"
      ),
      ghost: cn(
        "bg-transparent text-foreground hover:bg-black/5 dark:text-white dark:hover:bg-white/5"
      ),
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue disabled:pointer-events-none disabled:opacity-50",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

GradientButton.displayName = "GradientButton"
