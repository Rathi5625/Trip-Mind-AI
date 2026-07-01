import type { Coordinates, BoundingBox } from "../types/map"

// ── Coordinate conversion ─────────────────────────────────────────────────

/**
 * Convert a [lng, lat] tuple to a Coordinates object.
 */
export function tupleToCoords(coords: [number, number]): Coordinates {
  return { lng: coords[0], lat: coords[1] }
}

/**
 * Convert a Coordinates object to a [lng, lat] tuple.
 */
export function coordsToTuple(c: Coordinates): [number, number] {
  return [c.lng, c.lat]
}

/**
 * Convert a Coordinates to a MapLibre-compatible LngLatLike.
 */
export function toLngLatLike(c: Coordinates): [number, number] {
  return [c.lng, c.lat]
}

// ── Distance helpers ──────────────────────────────────────────────────────

const EARTH_RADIUS_KM = 6371

/**
 * Haversine formula: compute great-circle distance between two points in km.
 */
export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const h =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}

/**
 * Compute center point between a list of coordinates.
 */
export function computeCentroid(points: Coordinates[]): Coordinates {
  if (points.length === 0) return { lng: 0, lat: 0 }
  const lng = points.reduce((s, p) => s + p.lng, 0) / points.length
  const lat = points.reduce((s, p) => s + p.lat, 0) / points.length
  return { lng, lat }
}

/**
 * Compute a bounding box that fits all given coordinates with optional padding.
 */
export function computeBoundingBox(
  points: Coordinates[],
  paddingDeg = 0.5
): BoundingBox | null {
  if (points.length === 0) return null
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity
  for (const p of points) {
    if (p.lng < minLng) minLng = p.lng
    if (p.lng > maxLng) maxLng = p.lng
    if (p.lat < minLat) minLat = p.lat
    if (p.lat > maxLat) maxLat = p.lat
  }
  return {
    sw: { lng: minLng - paddingDeg, lat: minLat - paddingDeg },
    ne: { lng: maxLng + paddingDeg, lat: maxLat + paddingDeg }
  }
}

/**
 * Validate whether a Coordinates object is within valid geographic bounds.
 */
export function isValidCoords(c: Coordinates): boolean {
  return c.lng >= -180 && c.lng <= 180 && c.lat >= -90 && c.lat <= 90
}

/**
 * Clamp coordinates to valid ranges.
 */
export function clampCoords(c: Coordinates): Coordinates {
  return {
    lng: Math.max(-180, Math.min(180, c.lng)),
    lat: Math.max(-90, Math.min(90, c.lat))
  }
}

/**
 * Format a Coordinates object to a human-readable string.
 */
export function formatCoords(c: Coordinates, decimals = 4): string {
  const latDir = c.lat >= 0 ? "N" : "S"
  const lngDir = c.lng >= 0 ? "E" : "W"
  return `${Math.abs(c.lat).toFixed(decimals)}°${latDir}, ${Math.abs(c.lng).toFixed(decimals)}°${lngDir}`
}
