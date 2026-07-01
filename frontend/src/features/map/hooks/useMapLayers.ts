"use client"

import { useCallback } from "react"
import { useMapStore } from "../store/mapStore"
import type { LayerId } from "../types/map"
import { MAP_LAYERS } from "../constants/layers"

export function useMapLayers() {
  const activeLayers = useMapStore((s) => s.activeLayers)
  const toggleLayerAction = useMapStore((s) => s.toggleLayer)
  const setLayerEnabledAction = useMapStore((s) => s.setLayerEnabled)
  const resetLayersAction = useMapStore((s) => s.resetLayers)

  const isLayerActive = useCallback(
    (id: LayerId) => {
      return activeLayers[id] ?? false
    },
    [activeLayers]
  )

  const toggleLayer = useCallback(
    (id: LayerId) => {
      toggleLayerAction(id)
    },
    [toggleLayerAction]
  )

  const setLayerEnabled = useCallback(
    (id: LayerId, enabled: boolean) => {
      setLayerEnabledAction(id, enabled)
    },
    [setLayerEnabledAction]
  )

  const resetLayers = useCallback(() => {
    resetLayersAction()
  }, [resetLayersAction])

  const getLayersByCategory = useCallback((category: string) => {
    return MAP_LAYERS.filter((l) => l.category === category)
  }, [])

  return {
    layers: MAP_LAYERS,
    activeLayers,
    isLayerActive,
    toggleLayer,
    setLayerEnabled,
    resetLayers,
    getLayersByCategory
  }
}
