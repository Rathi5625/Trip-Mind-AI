"use client"

import * as React from "react"
import { Marker } from "react-map-gl/maplibre"
import { motion } from "framer-motion"
import { MapPin, Sparkles } from "lucide-react"
import { useMapStore } from "../store/mapStore"
import { markerDropVariants, markerHoverVariants, markerPulseVariants } from "../utils/animation"
import { MARKER_COLORS } from "../constants/mapStyles"
import type { MapMarker as MapMarkerConfig } from "../types/marker"

interface MapMarkerProps {
  marker: MapMarkerConfig
  onClick?: (id: string) => void
}

export function MapMarker({ marker, onClick }: MapMarkerProps) {
  const selectedMarkerId = useMapStore((s) => s.selectedMarkerId)
  const hoveredMarkerId = useMapStore((s) => s.hoveredMarkerId)
  const setSelectedMarkerId = useMapStore((s) => s.setSelectedMarkerId)
  const setHoveredMarkerId = useMapStore((s) => s.setHoveredMarkerId)

  const isSelected = selectedMarkerId === marker.id
  const isHovered = hoveredMarkerId === marker.id

  const color = marker.color ?? MARKER_COLORS[marker.type] ?? "#3B82F6"

  const sizeClass = {
    xs: "size-6",
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-14"
  }[marker.size ?? "md"]

  const handleMarkerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedMarkerId(marker.id)
    onClick?.(marker.id)
  }

  return (
    <Marker
      longitude={marker.coordinates.lng}
      latitude={marker.coordinates.lat}
      anchor="bottom"
      clickTolerance={10}
    >
      <motion.div
        variants={markerDropVariants}
        initial={marker.isAnimated ? "hidden" : "visible"}
        animate="visible"
        exit="exit"
        whileHover="hover"
        className="relative flex flex-col items-center cursor-pointer select-none outline-none group"
        onClick={handleMarkerClick}
        onMouseEnter={() => setHoveredMarkerId(marker.id)}
        onMouseLeave={() => setHoveredMarkerId(null)}
        role="button"
        tabIndex={0}
        aria-label={`${marker.label ?? marker.type} marker`}
        aria-describedby={marker.id}
        aria-selected={isSelected}
      >
        {/* Pulsing ring behind the marker if enabled */}
        {marker.isPulsing && (
          <motion.div
            variants={markerPulseVariants}
            animate="pulse"
            className="absolute -inset-2 rounded-full pointer-events-none"
            style={{ backgroundColor: `${color}1A`, border: `1px solid ${color}33` }}
          />
        )}

        {/* Marker Pin Design */}
        <motion.div
          variants={markerHoverVariants}
          animate={isSelected ? "selected" : isHovered ? "hover" : "rest"}
          className={`relative rounded-2xl flex items-center justify-center border-2 shadow-xl shadow-slate-900/10 transition-colors
            ${isSelected 
              ? "bg-blue-600 border-white text-white z-50 scale-110" 
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 z-10 hover:border-blue-400"
            } ${sizeClass}`}
        >
          {marker.imageUrl ? (
            <img
              src={marker.imageUrl}
              alt=""
              className="size-full rounded-2xl object-cover"
            />
          ) : (
            <MapPin className="size-4" style={{ color: isSelected ? "#fff" : color }} />
          )}

          {/* Sparkle badge for AI items */}
          {marker.type === "ai-recommended" && (
            <span className="absolute -top-1 -right-1 bg-violet-600 rounded-full p-0.5 border border-white text-white">
              <Sparkles className="size-2" />
            </span>
          )}

          {/* Text/Number Badge Overlay */}
          {marker.badge !== undefined && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[9px] font-black px-1.5 py-0.5 border border-white dark:border-slate-900">
              {marker.badge}
            </span>
          )}
        </motion.div>

        {/* Tiny Pin Arrow */}
        <div className={`w-2 h-2 -mt-1 rotate-45 border-r border-b shadow-md transition-colors
          ${isSelected 
            ? "bg-blue-600 border-white" 
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          }`} 
        />
      </motion.div>
    </Marker>
  )
}
