"use client"

import { useMemo } from "react"
import type { MapMarker } from "../types/marker"
import { useMapStore } from "../store/mapStore"
import { buildClusterIndex, getClusterPoints } from "../utils/clustering"

export function useCluster(markers: MapMarker[], viewportBounds: [number, number, number, number] | null, zoom: number) {
  const clusterConfig = useMapStore((s) => s.clusterConfig)

  const clusterIndex = useMemo(() => {
    if (!clusterConfig.enabled || markers.length === 0) return null
    return buildClusterIndex(markers, clusterConfig)
  }, [markers, clusterConfig])

  const points = useMemo(() => {
    if (!clusterIndex || !viewportBounds) {
      // Map all markers directly to unclustered points
      return markers.map((m) => ({
        id: m.id,
        coordinates: m.coordinates,
        isCluster: false,
        properties: {
          id: m.id,
          type: m.type,
          label: m.label,
          imageUrl: m.imageUrl,
          color: m.color
        }
      }))
    }

    return getClusterPoints(clusterIndex, viewportBounds, zoom)
  }, [clusterIndex, viewportBounds, zoom, markers])

  const getExpansionZoom = (clusterId: number) => {
    if (!clusterIndex) return 12
    try {
      return clusterIndex.getClusterExpansionZoom(clusterId)
    } catch {
      return Math.min(zoom + 2, clusterConfig.maxZoom)
    }
  }

  return {
    points,
    getExpansionZoom,
    clusterConfig
  }
}
