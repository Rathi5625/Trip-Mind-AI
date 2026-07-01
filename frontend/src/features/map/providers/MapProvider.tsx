"use client"

import * as React from "react"
import { MapProvider as ReactMapGLMapProvider } from "react-map-gl/maplibre"

interface MapProviderProps {
  children: React.ReactNode
}

/**
 * Reusable MapProvider that wraps react-map-gl context.
 * Wrap this at a high level or layout level if pages need to share map references.
 */
export function MapProvider({ children }: MapProviderProps) {
  return (
    <ReactMapGLMapProvider>
      {children}
    </ReactMapGLMapProvider>
  )
}
