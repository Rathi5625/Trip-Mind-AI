"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Compass, Star } from "lucide-react"

interface MapMarker {
  label: string
  x: number
  y: number
  type: "attraction" | "hotel" | "start"
}

interface MapRoute {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface LiveMapPreviewProps {
  name: string
  markers: MapMarker[]
  routes: MapRoute[]
}

export function LiveMapPreview({ name, markers, routes }: LiveMapPreviewProps) {
  const handleMapAction = () => {
    alert(`Opening detailed maps, geo-coordinates and satellite routes for ${name}...`)
  }

  return (
    <div className="relative w-full h-52 rounded-3xl overflow-hidden select-none border border-slate-100 dark:border-white/5 bg-slate-50/40 dark:bg-slate-950/20 shadow-md">
      {/* 1. Map Canvas SVG Grid & Path Drawing */}
      <svg className="absolute inset-0 size-full z-0" aria-hidden="true">
        {/* Background Dot grid mesh */}
        <defs>
          <pattern id="miniDotGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" className="fill-slate-200 dark:fill-slate-800" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#miniDotGrid)" />

        {/* Abstract vector shape representation of a city map */}
        <g className="opacity-[0.04] dark:opacity-[0.02] stroke-slate-550 dark:stroke-white stroke-[1.5] fill-none">
          <path d="M 0 50 Q 150 120 300 80 T 600 150" />
          <path d="M 120 0 Q 160 150 100 300" />
          <path d="M 220 0 Q 240 180 260 300" />
          <path d="M 0 200 Q 180 230 300 210" />
        </g>

        {/* Animated routes connecting markers */}
        {routes.map((route, index) => (
          <g key={index}>
            <line
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke="#2563EB"
              strokeWidth="2"
              strokeDasharray="4, 4"
              className="opacity-30"
            />
            <motion.line
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeDasharray="5, 5"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -40 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="opacity-75"
            />
          </g>
        ))}
      </svg>

      {/* 2. Interactive Markers on Map */}
      {markers.map((marker) => {
        // Map x, y values to percentages (assumed relative to a 300x208 canvas box)
        const leftPercent = (marker.x / 300) * 100
        const topPercent = (marker.y / 208) * 100

        const getMarkerColor = () => {
          if (marker.type === "hotel") return "bg-amber-500 shadow-amber-500/40 text-amber-500"
          if (marker.type === "start") return "bg-rose-500 shadow-rose-500/40 text-rose-500"
          return "bg-primary-blue shadow-blue-500/40 text-primary-blue"
        }

        return (
          <div
            key={marker.label}
            className="absolute group/marker -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
            style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
          >
            {/* Pulsing visual loop */}
            <span className="absolute flex size-4.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 ${
                marker.type === "hotel" ? "bg-amber-400" : marker.type === "start" ? "bg-rose-400" : "bg-blue-400"
              }`}></span>
            </span>

            {/* Pin Dot */}
            <div className={`size-2.5 rounded-full border border-white dark:border-slate-900 shadow-lg cursor-pointer ${
              getMarkerColor()
            }`} />

            {/* Micro pin labels */}
            <div className="absolute top-full.5 mt-1.5 opacity-80 group-hover/marker:opacity-100 pointer-events-none transition-opacity bg-slate-900/90 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md dark:bg-slate-800 whitespace-nowrap shadow-sm border border-white/5">
              {marker.label}
            </div>
          </div>
        )
      })}

      {/* 3. Gradient Glass Overlay widgets */}
      {/* Title label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[9px] font-black tracking-widest text-white uppercase bg-slate-900/80 dark:bg-slate-900/95 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm flex items-center gap-1">
          <Navigation className="size-2.5 rotate-45 text-blue-400 shrink-0" />
          Interactive Map
        </span>
      </div>

      {/* Zoom marker button */}
      <button
        onClick={handleMapAction}
        className="absolute bottom-4 right-4 z-20 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-white/10 text-white backdrop-blur-sm transition-colors cursor-pointer"
        aria-label="Fullscreen map view"
      >
        <Compass className="size-3.5 stroke-[2.5] animate-[spin_12s_linear_infinite]" />
      </button>

      {/* Active destination title */}
      <div className="absolute bottom-4 left-4 z-20">
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 border border-black/5 dark:border-white/5 px-2.5 py-1 rounded-xl backdrop-blur-sm shadow-sm">
          📍 {name}
        </h4>
      </div>
    </div>
  )
}
