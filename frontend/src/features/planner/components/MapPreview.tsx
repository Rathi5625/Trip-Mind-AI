"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Maximize2, Navigation } from "lucide-react"
import { Activity } from "../types/itinerary"

interface MapPreviewProps {
  activities: Activity[]
}

export function MapPreview({ activities }: MapPreviewProps) {
  const handleExpand = () => {
    alert("Opening full-screen detailed map view with step directions...")
  }

  // Draw connecting routes between chronological activities
  const routes = React.useMemo(() => {
    const lines = []
    for (let i = 0; i < activities.length - 1; i++) {
      const act1 = activities[i]
      const act2 = activities[i + 1]
      lines.push({
        x1: act1.coordinates.x,
        y1: act1.coordinates.y,
        x2: act2.coordinates.x,
        y2: act2.coordinates.y,
      })
    }
    return lines
  }, [activities])

  return (
    <div className="relative w-full h-40 rounded-3xl overflow-hidden bg-slate-950 shadow-lg border border-white/5 select-none flex flex-col justify-between p-4">
      {/* 1. Map Canvas SVG Grid & Paths */}
      <svg className="absolute inset-0 size-full z-0 pointer-events-none opacity-90" aria-hidden="true">
        {/* Background mesh grid */}
        <defs>
          <pattern id="darkMapGrid" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.5" fill="#334155" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#darkMapGrid)" />

        {/* Abstract road curves */}
        <g className="opacity-15 stroke-slate-700 stroke-[1] fill-none">
          <path d="M 0 30 Q 120 90 200 60 T 320 120" />
          <path d="M 90 0 Q 130 110 80 200" />
          <path d="M 180 0 Q 190 130 220 200" />
          <path d="M 0 140 Q 150 160 320 140" />
        </g>

        {/* Animated routes connecting active day activities */}
        {routes.map((route, index) => (
          <g key={index}>
            <line
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeDasharray="4, 4"
              className="opacity-40"
            />
            <motion.line
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4, 4"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="opacity-80"
            />
          </g>
        ))}
      </svg>

      {/* Header Info Overlay */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <span className="text-[8px] font-black tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
          <Navigation className="size-2 rotate-45 shrink-0" />
          Live Route
        </span>
        <button
          onClick={handleExpand}
          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm pointer-events-auto transition-colors cursor-pointer border border-white/10"
          aria-label="Expand Map"
        >
          <Maximize2 className="size-3 stroke-[2.5]" />
        </button>
      </div>

      {/* Markers (Coordinate Pins) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {activities.map((act, index) => {
          // Map coordinates relative to 320x160 viewport box
          const leftPercent = (act.coordinates.x / 320) * 100
          const topPercent = (act.coordinates.y / 160) * 100

          return (
            <div
              key={act.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              <div className="flex size-4.5 items-center justify-center rounded-full bg-blue-600 text-[8px] font-black text-white shadow-md shadow-blue-500/30 border border-white/20 select-none">
                {index + 1}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Info Overlay */}
      <div className="relative z-10 pointer-events-none">
        <span className="text-[10px] font-black text-slate-300 bg-slate-900/80 px-2 py-1 rounded-md border border-white/5 backdrop-blur-sm shadow-sm">
          📍 Day Overview
        </span>
      </div>
    </div>
  )
}
