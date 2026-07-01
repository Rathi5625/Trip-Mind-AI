"use client"

import { useCallback } from "react"
import { useMap as useReactMapGLMap } from "react-map-gl/maplibre"
import type { Coordinates, BoundingBox } from "../types/map"
import { useMapStore } from "../store/mapStore"
import { flyTo, fitBounds, zoomIn, zoomOut, resetNorth } from "../utils/mapHelpers"

export function useMapCamera(mapId = "default") {
  const { [mapId]: mapInstance } = useReactMapGLMap()
  const setCamera = useMapStore((s) => s.setCamera)

  const handleFlyTo = useCallback(
    (center: Coordinates, zoom?: number, pitch?: number, bearing?: number) => {
      if (!mapInstance) return
      flyTo(mapInstance, center, zoom, pitch, bearing)
      setCamera({ center, ...(zoom !== undefined && { zoom }) })
    },
    [mapInstance, setCamera]
  )

  const handleFitBounds = useCallback(
    (bounds: BoundingBox, padding = 50, maxZoom = 14) => {
      if (!mapInstance) return
      fitBounds(mapInstance, bounds, padding, maxZoom)
    },
    [mapInstance]
  )

  const handleZoomIn = useCallback(() => {
    if (!mapInstance) return
    zoomIn(mapInstance)
  }, [mapInstance])

  const handleZoomOut = useCallback(() => {
    if (!mapInstance) return
    zoomOut(mapInstance)
  }, [mapInstance])

  const handleResetNorth = useCallback(() => {
    if (!mapInstance) return
    resetNorth(mapInstance)
  }, [mapInstance])

  return {
    mapInstance,
    flyTo: handleFlyTo,
    fitBounds: handleFitBounds,
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    resetNorth: handleResetNorth
  }
}
