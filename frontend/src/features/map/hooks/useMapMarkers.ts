"use client"

import { useCallback, useState } from "react"
import { useMapStore } from "../store/mapStore"
import type { MapMarker } from "../types/marker"

export function useMapMarkers(initialMarkers: MapMarker[] = []) {
  const [markers, setMarkers] = useState<MapMarker[]>(initialMarkers)
  const selectedMarkerId = useMapStore((s) => s.selectedMarkerId)
  const hoveredMarkerId = useMapStore((s) => s.hoveredMarkerId)
  const setSelectedMarkerId = useMapStore((s) => s.setSelectedMarkerId)
  const setHoveredMarkerId = useMapStore((s) => s.setHoveredMarkerId)

  const addMarker = useCallback((marker: MapMarker) => {
    setMarkers((prev) => {
      const filtered = prev.filter((m) => m.id !== marker.id)
      return [...filtered, marker]
    })
  }, [])

  const removeMarker = useCallback((id: string) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id))
    if (selectedMarkerId === id) {
      setSelectedMarkerId(null)
    }
  }, [selectedMarkerId, setSelectedMarkerId])

  const clearMarkers = useCallback(() => {
    setMarkers([])
    setSelectedMarkerId(null)
  }, [setSelectedMarkerId])

  const selectMarker = useCallback(
    (id: string | null) => {
      setSelectedMarkerId(id)
    },
    [setSelectedMarkerId]
  )

  const setHoveredMarker = useCallback(
    (id: string | null) => {
      setHoveredMarkerId(id)
    },
    [setHoveredMarkerId]
  )

  return {
    markers,
    selectedMarkerId,
    hoveredMarkerId,
    addMarker,
    removeMarker,
    clearMarkers,
    selectMarker,
    setHoveredMarker,
    setMarkers
  }
}
