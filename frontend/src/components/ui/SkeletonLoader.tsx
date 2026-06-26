"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rect" | "circle"
  lines?: number
}

export function SkeletonLoader({
  className,
  variant = "rect",
  lines = 1,
  ...props
}: SkeletonLoaderProps) {
  const baseClass = "animate-pulse bg-slate-200 dark:bg-slate-800"

  if (variant === "circle") {
    return (
      <div
        className={cn(baseClass, "rounded-full shrink-0", className)}
        {...props}
      />
    )
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2 w-full">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClass,
              "h-4 rounded-md",
              i === lines - 1 && lines > 2 ? "w-4/5" : "w-full",
              className
            )}
            {...props}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClass,
        variant === "text" ? "h-4 rounded-md w-full" : "rounded-2xl",
        className
      )}
      {...props}
    />
  )
}
