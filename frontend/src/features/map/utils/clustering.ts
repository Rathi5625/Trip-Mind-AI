import Supercluster from "supercluster"
import type { ClusterConfig, Coordinates, ClusterPoint } from "../types/map"
import type { MapMarker } from "../types/marker"

// ─────────────────────────────────────────────────────────────────────────────
// GeoJSON feature type for Supercluster
// ─────────────────────────────────────────────────────────────────────────────

type PointFeature = GeoJSON.Feature<
  GeoJSON.Point,
  { id: string; [key: string]: unknown }
>

// ─────────────────────────────────────────────────────────────────────────────
// Build a Supercluster index from markers
// ─────────────────────────────────────────────────────────────────────────────

export function buildClusterIndex(
  markers: MapMarker[],
  config: ClusterConfig
): Supercluster {
  const index = new Supercluster({
    radius: config.radius,
    maxZoom: config.maxZoom,
    minPoints: config.minPoints,
    extent: config.extent,
    nodeSize: config.nodeSize
  })

  const features: PointFeature[] = markers.map((m) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [m.coordinates.lng, m.coordinates.lat]
    },
    properties: {
      id: m.id,
      type: m.type,
      label: m.label,
      imageUrl: m.imageUrl,
      color: m.color
    }
  }))

  index.load(features)
  return index
}

// ─────────────────────────────────────────────────────────────────────────────
// Get cluster points for current viewport
// ─────────────────────────────────────────────────────────────────────────────

export function getClusterPoints(
  index: Supercluster,
  bounds: [number, number, number, number], // [west, south, east, north]
  zoom: number
): ClusterPoint[] {
  const features = index.getClusters(bounds, Math.floor(zoom))

  return features.map((f) => {
    const isCluster = !!f.properties.cluster
    const coords: Coordinates = {
      lng: (f.geometry as GeoJSON.Point).coordinates[0],
      lat: (f.geometry as GeoJSON.Point).coordinates[1]
    }

    if (isCluster) {
      return {
        id: `cluster-${f.properties.cluster_id}`,
        coordinates: coords,
        count: f.properties.point_count as number,
        isCluster: true,
        clusterId: f.properties.cluster_id as number,
        properties: f.properties as Record<string, unknown>
      }
    }

    return {
      id: String(f.properties.id),
      coordinates: coords,
      isCluster: false,
      properties: f.properties as Record<string, unknown>
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Get children of a cluster on expansion
// ─────────────────────────────────────────────────────────────────────────────

export function getClusterChildren(
  index: Supercluster,
  clusterId: number
): GeoJSON.Feature[] {
  try {
    return index.getChildren(clusterId)
  } catch {
    return []
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Get the zoom level to expand a cluster to individual points
// ─────────────────────────────────────────────────────────────────────────────

export function getClusterExpansionZoom(
  index: Supercluster,
  clusterId: number
): number {
  try {
    return index.getClusterExpansionZoom(clusterId)
  } catch {
    return 12
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Cluster colour by count
// ─────────────────────────────────────────────────────────────────────────────

export function clusterColor(count: number): string {
  if (count >= 50) return "#EC4899"
  if (count >= 20) return "#8B5CF6"
  if (count >= 10) return "#3B82F6"
  return "#2563EB"
}

export function clusterSize(count: number): number {
  if (count >= 50) return 52
  if (count >= 20) return 44
  if (count >= 10) return 38
  return 32
}
