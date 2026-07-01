"use client"

import * as React from "react"

interface DestinationGridProps {
  children: React.ReactNode
}

export function DestinationGrid({ children }: DestinationGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full text-left">
      {children}
    </div>
  )
}
