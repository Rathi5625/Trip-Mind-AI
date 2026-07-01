"use client"

import * as React from "react"

interface DestinationOverviewProps {
  name: string
  description?: string
}

export function DestinationOverview({ name, description }: DestinationOverviewProps) {
  const defaultText = `${name} is world-famous for its historic landmarks, culinary excellence, romantic avenues, art collections, and vibrant fashion and design scenes.`

  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-2">
      <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
        Overview
      </h3>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
        {description || defaultText}
      </p>
    </div>
  )
}
