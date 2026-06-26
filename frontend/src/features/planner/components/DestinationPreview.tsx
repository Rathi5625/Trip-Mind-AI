"use client"

import * as React from "react"
import { Maximize2 } from "lucide-react"

interface DestinationPreviewProps {
  name: string
  image: string
}

export function DestinationPreview({ name, image }: DestinationPreviewProps) {
  const handleZoom = () => {
    alert(`Zooming in on ${name} maps and photos...`)
  }

  return (
    <div className="relative w-full h-48 rounded-3xl overflow-hidden group select-none border border-black/5 dark:border-white/5 shadow-md">
      {/* Destination Image */}
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Premium Glass shading overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent z-10" />

      {/* Label (Top Left) */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[9px] font-black tracking-widest text-white uppercase bg-slate-900/60 dark:bg-slate-900/80 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
          Destination
        </span>
      </div>

      {/* Maximize Button (Bottom Right) */}
      <button
        onClick={handleZoom}
        className="absolute bottom-4 right-4 z-20 p-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm transition-colors cursor-pointer"
        aria-label="Expand image"
      >
        <Maximize2 className="size-3.5 stroke-[2.5]" />
      </button>

      {/* Destination Name (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20">
        <h4 className="text-sm font-black text-white tracking-tight drop-shadow-sm">
          {name}
        </h4>
      </div>
    </div>
  )
}
