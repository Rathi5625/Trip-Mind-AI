"use client"

import * as React from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { useMapStore } from "../store/mapStore"

export function FullscreenButton() {
  const isFullscreen = useMapStore((s) => s.isFullscreen)
  const toggleFullscreen = useMapStore((s) => s.toggleFullscreen)

  const handleFullscreenToggle = () => {
    toggleFullscreen()
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen?.()
    }
  }

  return (
    <button
      onClick={handleFullscreenToggle}
      className="flex items-center justify-center size-8 rounded-xl
        text-slate-500 dark:text-slate-400
        hover:text-blue-600 dark:hover:text-blue-400
        hover:bg-blue-50 dark:hover:bg-blue-900/20
        transition-all cursor-pointer border-0 outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize2 className="size-4" strokeWidth={1.75} />
      ) : (
        <Maximize2 className="size-4" strokeWidth={1.75} />
      )}
    </button>
  )
}
