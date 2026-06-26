"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Map, Globe, Compass, Navigation } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { MapData } from "../types/dashboard"

interface InteractiveMapProps {
  mapData: MapData
}

export function InteractiveMap({ mapData }: InteractiveMapProps) {
  // Pin positions on a 800x320 SVG coordinate space
  const pins = [
    { name: "New York, USA", x: 180, y: 110, type: "visited" },
    { name: "London, UK", x: 380, y: 80, type: "visited" },
    { name: "Zurich, Switzerland", x: 405, y: 95, type: "planned" },
    { name: "Cairo, Egypt", x: 440, y: 140, type: "visited" },
    { name: "Mumbai, India", x: 550, y: 160, type: "visited" },
    { name: "Bali, Indonesia", x: 620, y: 220, type: "wishlist" },
    { name: "Tokyo, Japan", x: 690, y: 115, type: "planned" },
    { name: "Sydney, Australia", x: 720, y: 260, type: "wishlist" },
  ]

  // Flight paths (curves) between pins
  const flightPaths = [
    { from: "New York, USA", to: "Zurich, Switzerland", x1: 180, y1: 110, x2: 405, y2: 95, color: "#2563EB" },
    { from: "Zurich, Switzerland", to: "Tokyo, Japan", x1: 405, y1: 95, x2: 690, y2: 115, color: "#10B981" },
    { from: "Tokyo, Japan", to: "Bali, Indonesia", x1: 690, y1: 115, x2: 620, y2: 220, color: "#D6A89C" },
  ]

  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/70 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl w-full overflow-hidden select-none"
    >
      {/* Header & Stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-inner">
            <Map className="size-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
              Interactive Travel Map
            </h3>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
              Live flight paths and destination pins
            </p>
          </div>
        </div>

        {/* Counts summary row */}
        <div className="flex items-center gap-4 bg-slate-50/50 border border-black/5 dark:bg-slate-950/20 dark:border-white/5 px-4 py-2 rounded-2xl shrink-0">
          <div className="text-center">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Visited
            </span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-200">
              {mapData.visitedCountries}
            </span>
          </div>
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Planned
            </span>
            <span className="text-sm font-black text-primary-blue">
              {mapData.plannedDestinations}
            </span>
          </div>
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Wishlist
            </span>
            <span className="text-sm font-black text-rose-400">
              {mapData.wishlistDestinations}
            </span>
          </div>
        </div>
      </div>

      {/* Styled World Map Canvas */}
      <div className="relative w-full aspect-[800/320] bg-slate-50/40 dark:bg-slate-950/20 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-inner">
        {/* Background Grid Pattern */}
        <svg className="absolute inset-0 size-full z-0" aria-hidden="true">
          <defs>
            <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1" className="fill-slate-200 dark:fill-slate-800" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />

          {/* Stylized continent vectors for aesthetics (abstract shapes) */}
          <g className="opacity-15 dark:opacity-[0.08] fill-slate-400 dark:fill-slate-200 transition-opacity">
            {/* North America */}
            <path d="M 50,60 C 80,50 150,50 200,90 C 230,110 200,160 160,150 C 130,140 120,180 90,160 C 60,140 30,90 50,60 Z" />
            {/* South America */}
            <path d="M 170,160 C 190,170 210,210 200,250 C 190,290 160,310 150,280 C 140,250 135,210 150,185 C 160,170 165,160 170,160 Z" />
            {/* Eurasia / Africa */}
            <path d="M 350,50 C 450,30 650,20 720,80 C 750,110 700,160 670,150 C 640,140 600,120 570,150 C 530,180 500,220 460,200 C 420,180 380,190 370,150 C 350,110 320,80 350,50 Z" />
            {/* Africa */}
            <path d="M 370,160 C 410,150 440,180 460,220 C 470,250 430,280 410,300 C 390,310 380,270 375,240 C 370,210 360,180 370,160 Z" />
            {/* Australia */}
            <path d="M 680,240 C 720,230 740,250 735,280 C 720,300 680,290 670,270 C 660,250 670,245 680,240 Z" />
          </g>

          {/* Bezier curve flight paths with dashed flow lines */}
          {flightPaths.map((path, idx) => {
            // Bezier control point to make it look like a nice arc
            const cx = (path.x1 + path.x2) / 2
            const cy = Math.min(path.y1, path.y2) - 40 // curve upwards

            return (
              <g key={idx}>
                {/* Background static curve */}
                <path
                  d={`M ${path.x1} ${path.y1} Q ${cx} ${cy} ${path.x2} ${path.y2}`}
                  fill="none"
                  stroke={path.color}
                  strokeWidth="1.5"
                  className="opacity-25"
                />
                {/* Animated dash flow */}
                <motion.path
                  d={`M ${path.x1} ${path.y1} Q ${cx} ${cy} ${path.x2} ${path.y2}`}
                  fill="none"
                  stroke={path.color}
                  strokeWidth="2"
                  strokeDasharray="6, 6"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -120 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear",
                  }}
                  className="opacity-75"
                />
              </g>
            )
          })}
        </svg>

        {/* HTML overlay pins (pins are absolute positioned with SVG coordinates mapped as percentages) */}
        {pins.map((pin) => {
          const leftPercent = (pin.x / 800) * 100
          const topPercent = (pin.y / 320) * 100

          const getPinColor = (type: string) => {
            if (type === "visited") return "bg-slate-400 dark:bg-slate-500 shadow-slate-400/20"
            if (type === "planned") return "bg-primary-blue shadow-blue-500/40"
            return "bg-rose-400 shadow-rose-400/45"
          }

          return (
            <div
              key={pin.name}
              className="absolute group/pin -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              {/* Pulsing ring indicator for planned/wishlist */}
              {pin.type !== "visited" && (
                <span className="absolute flex h-5 w-5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                    pin.type === "planned" ? "bg-blue-400" : "bg-rose-400"
                  }`}></span>
                </span>
              )}

              {/* Pin Dot */}
              <div className={`size-3 rounded-full border border-white dark:border-slate-900 shadow-lg transition-transform group-hover/pin:scale-125 z-10 cursor-pointer ${
                getPinColor(pin.type)
              }`} />

              {/* Tooltip Label */}
              <div className="absolute bottom-full mb-2.5 opacity-0 group-hover/pin:opacity-100 pointer-events-none transition-all duration-300 scale-90 group-hover/pin:scale-100 z-30 select-none">
                <div className="bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg dark:bg-slate-800 whitespace-nowrap shadow-md flex items-center gap-1.5 border border-white/5">
                  <Navigation className="size-2.5 rotate-45 text-blue-400 shrink-0" />
                  <span>{pin.name}</span>
                  <span className={`text-[8px] font-black uppercase px-1 rounded-md ${
                    pin.type === "visited"
                      ? "bg-slate-800 text-slate-400"
                      : pin.type === "planned"
                      ? "bg-blue-900/60 text-blue-300"
                      : "bg-rose-950/60 text-rose-300"
                  }`}>
                    {pin.type}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/70 backdrop-blur-md border border-black/5 dark:bg-slate-900/80 dark:border-white/5 px-2.5 py-1.5 rounded-xl z-20 flex gap-3 text-[9px] font-bold text-slate-500 dark:text-slate-400 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-slate-400" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary-blue" />
            <span>Planned</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-rose-400" />
            <span>Wishlist</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
