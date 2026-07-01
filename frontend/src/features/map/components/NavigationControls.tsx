"use client"

import * as React from "react"
import { ZoomControls } from "./ZoomControls"
import { CompassButton } from "./CompassButton"
import { UserLocationButton } from "./UserLocationButton"
import { FullscreenButton } from "./FullscreenButton"

interface NavigationControlsProps {
  className?: string
}

export function NavigationControls({ className = "" }: NavigationControlsProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl z-30 ${className}`}
      role="group"
      aria-label="Navigation controls"
    >
      <ZoomControls />
      <div className="h-px bg-slate-100 dark:bg-slate-800/80 my-0.5" />
      <CompassButton />
      <UserLocationButton />
      <FullscreenButton />
    </div>
  )
}
