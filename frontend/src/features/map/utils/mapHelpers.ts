import type { Coordinates, BoundingBox, CameraState } from "../types/map"
import type { MapRef } from "react-map-gl/maplibre"
import { FLY_TO_CURVE, FLY_TO_DURATION } from "../constants/mapStyles"

// ─────────────────────────────────────────────────────────────────────────────
// Coordinate utilities
// ─────────────────────────────────────────────────────────────────────────────

export function coordsToArray(c: Coordinates): [number, number] {
  return [c.lng, c.lat]
}

export function arrayToCoords(arr: [number, number]): Coordinates {
  return { lng: arr[0], lat: arr[1] }
}

export function isValidCoords(c: Coordinates): boolean {
  return (
    typeof c.lng === "number" &&
    typeof c.lat === "number" &&
    c.lng >= -180 && c.lng <= 180 &&
    c.lat >= -90 && c.lat <= 90 &&
    isFinite(c.lng) && isFinite(c.lat)
  )
}

export function clampCoords(c: Coordinates): Coordinates {
  return {
    lng: Math.max(-180, Math.min(180, c.lng)),
    lat: Math.max(-90, Math.min(90, c.lat))
  }
}

export function formatCoords(c: Coordinates, decimals = 4): string {
  const latDir = c.lat >= 0 ? "N" : "S"
  const lngDir = c.lng >= 0 ? "E" : "W"
  return `${Math.abs(c.lat).toFixed(decimals)}°${latDir}, ${Math.abs(c.lng).toFixed(decimals)}°${lngDir}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Haversine distance
// ─────────────────────────────────────────────────────────────────────────────

const EARTH_RADIUS_KM = 6371

export function haversineKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const h =
    sinDLat ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

// ─────────────────────────────────────────────────────────────────────────────
// Bounding box
// ─────────────────────────────────────────────────────────────────────────────

export function computeBoundingBox(
  points: Coordinates[],
  paddingDeg = 0.3
): BoundingBox | null {
  if (points.length === 0) return null
  let minLng = Infinity, maxLng = -Infinity
  let minLat = Infinity, maxLat = -Infinity
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

export function computeCentroid(points: Coordinates[]): Coordinates {
  if (points.length === 0) return { lng: 0, lat: 0 }
  return {
    lng: points.reduce((s, p) => s + p.lng, 0) / points.length,
    lat: points.reduce((s, p) => s + p.lat, 0) / points.length
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Camera controls (react-map-gl MapRef)
// ─────────────────────────────────────────────────────────────────────────────

export function flyTo(
  mapRef: MapRef,
  center: Coordinates,
  zoom?: number,
  pitch?: number,
  bearing?: number
): void {
  mapRef.flyTo({
    center: coordsToArray(center),
    zoom: zoom ?? mapRef.getZoom(),
    pitch: pitch ?? mapRef.getPitch(),
    bearing: bearing ?? mapRef.getBearing(),
    duration: FLY_TO_DURATION,
    curve: FLY_TO_CURVE,
    essential: true
  })
}

export function fitBounds(
  mapRef: MapRef,
  bounds: BoundingBox,
  padding = 60,
  maxZoom = 12
): void {
  mapRef.fitBounds(
    [coordsToArray(bounds.sw), coordsToArray(bounds.ne)],
    { padding, maxZoom, duration: FLY_TO_DURATION, essential: true }
  )
}

export function fitPointsInView(
  mapRef: MapRef,
  points: Coordinates[],
  padding = 80
): void {
  const bbox = computeBoundingBox(points)
  if (bbox) fitBounds(mapRef, bbox, padding)
}

export function zoomIn(mapRef: MapRef): void {
  mapRef.zoomIn({ duration: 300 })
}

export function zoomOut(mapRef: MapRef): void {
  mapRef.zoomOut({ duration: 300 })
}

export function resetNorth(mapRef: MapRef): void {
  mapRef.easeTo({ bearing: 0, duration: 600 })
}

export function resetCamera(mapRef: MapRef, camera: CameraState): void {
  mapRef.flyTo({
    center: coordsToArray(camera.center),
    zoom: camera.zoom,
    pitch: camera.pitch,
    bearing: camera.bearing,
    duration: FLY_TO_DURATION,
    essential: true
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// GeoJSON helpers
// ─────────────────────────────────────────────────────────────────────────────

export function pointsToGeoJSON(
  points: Array<{ id: string; coordinates: Coordinates; [key: string]: unknown }>
): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coordsToArray(p.coordinates)
      },
      properties: { ...p }
    }))
  }
}

export function lineStringFromCoords(
  coords: Coordinates[]
): GeoJSON.Feature<GeoJSON.LineString> {
  return {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: coords.map(coordsToArray)
    },
    properties: {}
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Misc
// ─────────────────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function generateMarkerId(prefix = "marker"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
