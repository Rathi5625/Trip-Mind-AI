"use client"

import * as React from "react"
import { Compass } from "lucide-react"
import { useMapCamera } from "../hooks/useMapCamera"
import { useMapStore } from "../store/mapStore"

export function CompassButton() {
  const { resetNorth } = useMapCamera()
  const isMapReady = useMapStore((s) => s.isMapReady)
  const bearing = useMapStore((s) => s.camera.bearing)

  const handleCompassReset = () => {
    resetNorth()
  }

  return (
    <button
      onClick={handleCompassReset}
      disabled={!isMapReady}
      className="flex items-center justify-center size-8 rounded-xl
        text-slate-500 dark:text-slate-400
        hover:text-blue-600 dark:hover:text-blue-400
        hover:bg-blue-50 dark:hover:bg-blue-900/20
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all cursor-pointer border-0 outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Reset orientation to North"
      title="Reset north"
      style={{
        transform: `rotate(${-bearing}deg)`,
        transition: "transform 0.3s ease-out"
      }}
    >
      <Compass className="size-4" strokeWidth={1.75} />
    </button>
  )
}
