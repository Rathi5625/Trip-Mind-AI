"use client"

import * as React from "react"

interface ResultsGridProps {
  children: React.ReactNode
}

export function ResultsGrid({ children }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {children}
    </div>
  )
}
