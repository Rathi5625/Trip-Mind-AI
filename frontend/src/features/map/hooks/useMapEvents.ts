"use client"

import { useCallback } from "react"
import type { MapLayerMouseEvent } from "react-map-gl/maplibre"
import { useMapStore } from "../store/mapStore"
import type { Coordinates } from "../types/map"

export interface UseMapEventsOptions {
  onClick?: (coords: Coordinates, event: MapLayerMouseEvent) => void
  onHover?: (coords: Coordinates | null, event?: MapLayerMouseEvent) => void
  onMoveEnd?: (camera: { center: Coordinates; zoom: number; pitch: number; bearing: number }) => void
}

export function useMapEvents(options?: UseMapEventsOptions) {
  const setCamera = useMapStore((s) => s.setCamera)
  const setSelectedMarkerId = useMapStore((s) => s.setSelectedMarkerId)
  const setHoveredMarkerId = useMapStore((s) => s.setHoveredMarkerId)

  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const coords: Coordinates = { lng: e.lngLat.lng, lat: e.lngLat.lat }
      
      // Determine if a feature was clicked
      const features = e.target.queryRenderedFeatures(e.point)
      const clickedMarker = features.find((f) => f.properties?.id)
      
      if (!clickedMarker) {
        // Clicked on empty space of the map
        setSelectedMarkerId(null)
      }
      
      options?.onClick?.(coords, e)
    },
    [setSelectedMarkerId, options]
  )

  const handleMapMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const coords: Coordinates = { lng: e.lngLat.lng, lat: e.lngLat.lat }
      const features = e.target.queryRenderedFeatures(e.point)
      const hoveredMarker = features.find((f) => f.properties?.id)
      
      if (hoveredMarker) {
        setHoveredMarkerId(hoveredMarker.properties.id)
      } else {
        setHoveredMarkerId(null)
      }
      
      options?.onHover?.(coords, e)
    },
    [setHoveredMarkerId, options]
  )

  const handleMapMouseLeave = useCallback(
    (e: MapLayerMouseEvent) => {
      setHoveredMarkerId(null)
      options?.onHover?.(null, e)
    },
    [setHoveredMarkerId, options]
  )

  const handleMoveEnd = useCallback(
    (e: { target: any }) => {
      const map = e.target
      if (!map) return

      const center = map.getCenter()
      const newCamera = {
        center: { lng: center.lng, lat: center.lat },
        zoom: map.getZoom(),
        pitch: map.getPitch(),
        bearing: map.getBearing()
      }

      setCamera(newCamera)
      options?.onMoveEnd?.(newCamera)
    },
    [setCamera, options]
  )

  return {
    handleMapClick,
    handleMapMouseMove,
    handleMapMouseLeave,
    handleMoveEnd
  }
}
