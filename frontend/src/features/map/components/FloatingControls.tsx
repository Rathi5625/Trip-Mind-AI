"use client"

import * as React from "react"
import { NavigationControls } from "./NavigationControls"

interface FloatingControlsProps {
  className?: string
}

export function FloatingControls({ className = "" }: FloatingControlsProps) {
  return (
    <div
      className={`absolute bottom-6 right-6 z-30 pointer-events-none ${className}`}
    >
      <div className="pointer-events-auto">
        <NavigationControls />
      </div>
    </div>
  )
}
