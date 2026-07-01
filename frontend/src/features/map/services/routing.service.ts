// ─────────────────────────────────────────────────────────────────────────────
// OSRM Routing Service (free, no API key)
// https://router.project-osrm.org/
// ─────────────────────────────────────────────────────────────────────────────

import type { Coordinates, TravelRoute, RouteStep, RouteProfile } from "../types/map"

const OSRM_BASE = "https://router.project-osrm.org"

export interface RouteRequest {
  waypoints: Coordinates[]
  profile: RouteProfile
  alternatives?: boolean
  steps?: boolean
  annotations?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Calculate route between waypoints
// ─────────────────────────────────────────────────────────────────────────────

export async function calculateRoute(
  request: RouteRequest
): Promise<TravelRoute | null> {
  if (request.waypoints.length < 2) return null

  const coordString = request.waypoints
    .map((c) => `${c.lng},${c.lat}`)
    .join(";")

  const profile = request.profile === "driving" ? "car"
    : request.profile === "cycling" ? "bike"
    : "foot"

  const params = new URLSearchParams({
    overview: "full",
    geometries: "geojson",
    steps: String(request.steps ?? true),
    alternatives: String(request.alternatives ?? false),
    annotations: String(request.annotations ?? false)
  })

  const url = `${OSRM_BASE}/route/v1/${profile}/${coordString}?${params}`

  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Routing failed: ${res.statusText}`)

    const data = await res.json()
    if (data.code !== "Ok" || !data.routes?.[0]) return null

    const route = data.routes[0]
    const leg = route.legs[0]

    const steps: RouteStep[] = (leg?.steps ?? []).map((s: any) => ({
      instruction: s.maneuver?.instruction ?? buildInstruction(s),
      distance: s.distance ?? 0,
      duration: s.duration ?? 0,
      coordinates: {
        lng: s.maneuver?.location?.[0] ?? 0,
        lat: s.maneuver?.location?.[1] ?? 0
      }
    }))

    return {
      id: `route-${Date.now()}`,
      profile: request.profile,
      waypoints: request.waypoints,
      geojson: {
        type: "Feature",
        geometry: route.geometry,
        properties: {}
      },
      distance: route.distance ?? 0,
      duration: route.duration ?? 0,
      steps
    }
  } catch (err) {
    console.error("[routing.service] Error:", err)
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Simple instruction builder for steps missing maneuver.instruction
// ─────────────────────────────────────────────────────────────────────────────

function buildInstruction(step: any): string {
  const type = step?.maneuver?.type ?? "continue"
  const modifier = step?.maneuver?.modifier ?? ""
  const name = step?.name ?? ""

  const typeMap: Record<string, string> = {
    turn: `Turn ${modifier}`,
    "new name": "Continue on",
    depart: "Head",
    arrive: "Arrive at",
    merge: "Merge",
    "on ramp": "Take the on-ramp",
    "off ramp": "Take the off-ramp",
    fork: `At the fork, keep ${modifier}`,
    roundabout: "Enter the roundabout",
    "exit roundabout": "Exit the roundabout",
    continue: "Continue"
  }

  const action = typeMap[type] ?? "Continue"
  return name ? `${action} onto ${name}` : action
}

// ─────────────────────────────────────────────────────────────────────────────
// Format duration in human-readable form
// ─────────────────────────────────────────────────────────────────────────────

export function formatRouteDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m} min`
}

export function formatRouteDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}
