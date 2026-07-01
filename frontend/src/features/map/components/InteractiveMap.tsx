"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import Map, { NavigationControl, AttributionControl, type MapRef, type MapLayerMouseEvent } from "react-map-gl/maplibre"
import maplibregl from "maplibre-gl"
import { useMapStore } from "../store/mapStore"
import { useMapTheme } from "../hooks/useMapTheme"
import { useMapEvents } from "../hooks/useMapEvents"
import { MAP_STYLE_URLS } from "../constants/mapStyles"
import { LoadingOverlay } from "./LoadingOverlay"
import { ErrorOverlay } from "./ErrorOverlay"
import "maplibre-gl/dist/maplibre-gl.css"

export interface InteractiveMapProps {
  mapId?: string
  className?: string
  children?: React.ReactNode
  onMapClick?: (coords: { lng: number; lat: number }, event: MapLayerMouseEvent) => void
  onLoad?: (map: maplibregl.Map) => void
}

/**
 * InteractiveMap component powered by MapLibre GL JS & react-map-gl.
 * Supports dark mode, style switching, error boundaries, loading shimmers, and interactive overlays.
 */
export function InteractiveMap({
  mapId = "default",
  className,
  children,
  onMapClick,
  onLoad
}: InteractiveMapProps) {
  const mapRef = useRef<MapRef | null>(null)
  
  // Zustand State
  const camera = useMapStore((s) => s.camera)
  const themeId = useMapStore((s) => s.themeId)
  const isMapReady = useMapStore((s) => s.isMapReady)
  const isLoading = useMapStore((s) => s.isLoading)
  const mapError = useMapStore((s) => s.mapError)
  
  const setIsMapReady = useMapStore((s) => s.setIsMapReady)
  const setIsLoading = useMapStore((s) => s.setIsLoading)
  const setMapError = useMapStore((s) => s.setMapError)

  const { currentTheme } = useMapTheme()
  const { handleMapClick, handleMapMouseMove, handleMapMouseLeave, handleMoveEnd } = useMapEvents({
    onClick: onMapClick
  })

  // Watch for style loading finish
  const handleLoad = React.useCallback(
    (e: { target: any }) => {
      const map = e.target
      setIsMapReady(true)
      setIsLoading(false)
      onLoad?.(map)
    },
    [setIsMapReady, setIsLoading, onLoad]
  )

  useEffect(() => {
    // Basic connectivity check
    if (typeof window !== "undefined" && !window.navigator.onLine) {
      setMapError("You are offline. Unable to load map styles.")
    }
  }, [setMapError])

  return (
    <div className={`relative w-full h-full select-none ${className ?? ""}`}>
      {/* MapLibre Canvas Container */}
      <Map
        id={mapId}
        ref={mapRef}
        initialViewState={{
          longitude: camera.center.lng,
          latitude: camera.center.lat,
          zoom: camera.zoom,
          bearing: camera.bearing,
          pitch: camera.pitch
        }}
        mapLib={maplibregl}
        mapStyle={MAP_STYLE_URLS[themeId]}
        onLoad={handleLoad}
        onClick={handleMapClick}
        onMouseMove={handleMapMouseMove}
        onMouseLeave={handleMapMouseLeave}
        onMoveEnd={handleMoveEnd}
        attributionControl={false}
        logoPosition="bottom-left"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Scale/attribution bar */}
        <AttributionControl compact position="bottom-right" />

        {/* Custom layered components inside the map instance */}
        {isMapReady && children}
      </Map>

      {/* Overlays */}
      <LoadingOverlay isLoading={isLoading} />
      <ErrorOverlay error={mapError} />
    </div>
  )
}
