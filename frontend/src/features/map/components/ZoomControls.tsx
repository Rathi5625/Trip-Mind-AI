"use client"

import * as React from "react"
import { Plus, Minus } from "lucide-react"
import { useMapCamera } from "../hooks/useMapCamera"
import { useMapStore } from "../store/mapStore"

export function ZoomControls() {
  const { zoomIn, zoomOut } = useMapCamera()
  const isMapReady = useMapStore((s) => s.isMapReady)

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={zoomIn}
        disabled={!isMapReady}
        className="flex items-center justify-center size-8 rounded-xl
          text-slate-500 dark:text-slate-400
          hover:text-blue-600 dark:hover:text-blue-400
          hover:bg-blue-50 dark:hover:bg-blue-900/20
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all cursor-pointer border-0 outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Zoom in"
        title="Zoom in"
      >
        <Plus className="size-4" strokeWidth={1.75} />
      </button>
      
      <button
        onClick={zoomOut}
        disabled={!isMapReady}
        className="flex items-center justify-center size-8 rounded-xl
          text-slate-500 dark:text-slate-400
          hover:text-blue-600 dark:hover:text-blue-400
          hover:bg-blue-50 dark:hover:bg-blue-900/20
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all cursor-pointer border-0 outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Zoom out"
        title="Zoom out"
      >
        <Minus className="size-4" strokeWidth={1.75} />
      </button>
    </div>
  )
}
