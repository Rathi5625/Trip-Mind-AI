"use client"

import { useRef, useCallback, useContext } from "react"
import type { MapRef } from "react-map-gl/maplibre"
import { useMapStore } from "../store/mapStore"
import {
  flyTo as flyToHelper,
  fitBounds as fitBoundsHelper,
  fitPointsInView,
  zoomIn as zoomInHelper,
  zoomOut as zoomOutHelper,
  resetNorth as resetNorthHelper,
  resetCamera as resetCameraHelper
} from "../utils/mapHelpers"
import type { Coordinates, BoundingBox, LayerId, TravelRoute } from "../types/map"
import { MAP_STYLE_URLS } from "../constants/mapStyles"

// ─────────────────────────────────────────────────────────────────────────────
// useMap — primary hook for consuming the map in any component
// ─────────────────────────────────────────────────────────────────────────────

export function useMap() {
  const mapRef = useRef<MapRef>(null)

  // State
  const camera = useMapStore((s) => s.camera)
  const themeId = useMapStore((s) => s.themeId)
  const isMapReady = useMapStore((s) => s.isMapReady)
  const isLoading = useMapStore((s) => s.isLoading)
  const mapError = useMapStore((s) => s.mapError)
  const isSidebarOpen = useMapStore((s) => s.isSidebarOpen)
  const isFullscreen = useMapStore((s) => s.isFullscreen)
  const selectedMarkerId = useMapStore((s) => s.selectedMarkerId)
  const activeRoute = useMapStore((s) => s.activeRoute)

  // Actions
  const setCamera = useMapStore((s) => s.setCamera)
  const setThemeId = useMapStore((s) => s.setThemeId)
  const setIsMapReady = useMapStore((s) => s.setIsMapReady)
  const setIsLoading = useMapStore((s) => s.setIsLoading)
  const setMapError = useMapStore((s) => s.setMapError)
  const toggleSidebar = useMapStore((s) => s.toggleSidebar)
  const toggleFullscreen = useMapStore((s) => s.toggleFullscreen)
  const setActiveRoute = useMapStore((s) => s.setActiveRoute)
  const clearRoute = useMapStore((s) => s.clearRoute)
  const toggleLayer = useMapStore((s) => s.toggleLayer)

  // ── Camera controls ────────────────────────────────────────────────────

  const flyTo = useCallback(
    (center: Coordinates, zoom?: number, pitch?: number, bearing?: number) => {
      if (mapRef.current) {
        flyToHelper(mapRef.current, center, zoom, pitch, bearing)
        setCamera({ center, ...(zoom !== undefined && { zoom }) })
      }
    },
    [setCamera]
  )

  const fitBounds = useCallback(
    (bounds: BoundingBox, padding?: number) => {
      if (mapRef.current) fitBoundsHelper(mapRef.current, bounds, padding)
    },
    []
  )

  const fitPoints = useCallback(
    (points: Coordinates[], padding?: number) => {
      if (mapRef.current) fitPointsInView(mapRef.current, points, padding)
    },
    []
  )

  const zoomIn = useCallback(() => {
    if (mapRef.current) zoomInHelper(mapRef.current)
  }, [])

  const zoomOut = useCallback(() => {
    if (mapRef.current) zoomOutHelper(mapRef.current)
  }, [])

  const resetNorth = useCallback(() => {
    if (mapRef.current) resetNorthHelper(mapRef.current)
  }, [])

  const resetView = useCallback(() => {
    if (mapRef.current) resetCameraHelper(mapRef.current, camera)
  }, [camera])

  // ── Theme ──────────────────────────────────────────────────────────────

  const setTheme = useCallback(
    (id: typeof themeId) => {
      setThemeId(id)
      if (mapRef.current) {
        mapRef.current.getMap().setStyle(MAP_STYLE_URLS[id])
      }
    },
    [setThemeId]
  )

  // ── Map instance ───────────────────────────────────────────────────────

  const getMapInstance = useCallback(() => {
    return mapRef.current?.getMap() ?? null
  }, [])

  return {
    // Refs
    mapRef,

    // State
    camera,
    themeId,
    isMapReady,
    isLoading,
    mapError,
    isSidebarOpen,
    isFullscreen,
    selectedMarkerId,
    activeRoute,

    // Camera
    flyTo,
    fitBounds,
    fitPoints,
    zoomIn,
    zoomOut,
    resetNorth,
    resetView,

    // Theme
    setTheme,

    // Route
    setActiveRoute,
    clearRoute,

    // Layers
    toggleLayer,

    // UI
    toggleSidebar,
    toggleFullscreen,

    // Status
    setIsMapReady,
    setIsLoading,
    setMapError,

    // Raw access
    getMapInstance
  }
}
