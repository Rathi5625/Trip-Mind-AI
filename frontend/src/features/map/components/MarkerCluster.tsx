"use client"

import * as React from "react"
import { Marker } from "react-map-gl/maplibre"
import { motion } from "framer-motion"
import { useMapCamera } from "../hooks/useMapCamera"
import { clusterVariants } from "../utils/animation"
import { clusterColor, clusterSize } from "../utils/clustering"
import type { ClusterPoint } from "../types/map"

interface MarkerClusterProps {
  cluster: ClusterPoint
  getExpansionZoom: (id: number) => number
  onClusterClick?: (coords: { lng: number; lat: number }, zoom: number) => void
}

export function MarkerCluster({
  cluster,
  getExpansionZoom,
  onClusterClick
}: MarkerClusterProps) {
  const { flyTo } = useMapCamera()

  const handleClusterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!cluster.clusterId) return
    const expansionZoom = getExpansionZoom(cluster.clusterId)
    
    // Zoom in on center of clicked cluster
    flyTo(cluster.coordinates, expansionZoom)
    onClusterClick?.(cluster.coordinates, expansionZoom)
  }

  const color = clusterColor(cluster.count ?? 1)
  const size = clusterSize(cluster.count ?? 1)

  return (
    <Marker
      longitude={cluster.coordinates.lng}
      latitude={cluster.coordinates.lat}
      anchor="center"
    >
      <motion.div
        variants={clusterVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={handleClusterClick}
        className="flex items-center justify-center rounded-full text-white font-black text-xs cursor-pointer shadow-lg border-2 border-white dark:border-slate-900 select-none z-30 transition-transform"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 8px 24px ${color}4D`
        }}
        role="button"
        tabIndex={0}
        aria-label={`Cluster of ${cluster.count} locations`}
      >
        <span>{cluster.count}</span>
      </motion.div>
    </Marker>
  )
}
