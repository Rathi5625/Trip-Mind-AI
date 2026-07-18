// ─────────────────────────────────────────────────────────────────────────────
// Map Service — React Query data fetching for map features
// ─────────────────────────────────────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query"
import type { Coordinates } from "../types/map"
import type { Destination } from "../types/destination"
import { geocodePlace, reverseGeocode, type GeocodingResult } from "./geocoding.service"
import { calculateRoute, type RouteRequest } from "./routing.service"

// ─────────────────────────────────────────────────────────────────────────────
// Query keys
// ─────────────────────────────────────────────────────────────────────────────

export const MAP_QUERY_KEYS = {
  search: (q: string) => ["map", "search", q] as const,
  reverseGeocode: (coords: Coordinates) => ["map", "reverse", coords.lat, coords.lng] as const,
  nearbyPlaces: (coords: Coordinates, type: string, radius: number) =>
    ["map", "nearby", coords.lat, coords.lng, type, radius] as const,
  route: (waypoints: Coordinates[], profile: string) =>
    ["map", "route", ...waypoints.map((c) => `${c.lat},${c.lng}`), profile] as const,
  weather: (coords: Coordinates) => ["map", "weather", coords.lat, coords.lng] as const,
  countryInfo: (code: string) => ["map", "country", code] as const
}

// ─────────────────────────────────────────────────────────────────────────────
// useSearchPlaces — TanStack React Query wrapper
// ─────────────────────────────────────────────────────────────────────────────

export function useSearchPlaces(
  query: string,
  options?: { enabled?: boolean; limit?: number; debounceMs?: number }
) {
  return useQuery({
    queryKey: MAP_QUERY_KEYS.search(query),
    queryFn: () => geocodePlace(query, { limit: options?.limit ?? 8 }),
    enabled: (options?.enabled ?? true) && query.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// useReverseGeocode
// ─────────────────────────────────────────────────────────────────────────────

export function useReverseGeocode(
  coords: Coordinates | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: coords ? MAP_QUERY_KEYS.reverseGeocode(coords) : ["map", "reverse", null],
    queryFn: () => (coords ? reverseGeocode(coords) : null),
    enabled: (options?.enabled ?? true) && !!coords,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
    retry: 1,
    refetchOnWindowFocus: false
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// useNearbyPlaces — Overpass API (free OSM-based POI data)
// ─────────────────────────────────────────────────────────────────────────────

const OVERPASS_API = "https://overpass-api.de/api/interpreter"

type OverpassAmenity =
  | "hotel"
  | "restaurant"
  | "museum"
  | "hospital"
  | "airport"
  | "train_station"
  | "tourism"
  | "attraction"

export interface NearbyPlace {
  id: string
  name: string
  type: OverpassAmenity | string
  coordinates: Coordinates
  tags: Record<string, string>
}

import axios from "axios"

async function fetchNearbyPlaces(
  coords: Coordinates,
  amenity: OverpassAmenity,
  radiusMeters: number
): Promise<NearbyPlace[]> {
  const query = `
    [out:json][timeout:10];
    (
      node["amenity"="${amenity}"](around:${radiusMeters},${coords.lat},${coords.lng});
      node["tourism"="${amenity}"](around:${radiusMeters},${coords.lat},${coords.lng});
    );
    out body;
  `
  const res = await axios.post(OVERPASS_API, `data=${encodeURIComponent(query)}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })

  const data = res.data
  return ((data.elements ?? []) as any[])
    .filter((el) => el.lat && el.lon && el.tags?.name)
    .map((el) => ({
      id: String(el.id),
      name: el.tags.name,
      type: el.tags.amenity ?? el.tags.tourism ?? "place",
      coordinates: { lat: el.lat, lng: el.lon },
      tags: el.tags ?? {}
    }))
}

export function useNearbyPlaces(
  coords: Coordinates | null,
  amenity: OverpassAmenity,
  radiusMeters = 2000,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: coords
      ? MAP_QUERY_KEYS.nearbyPlaces(coords, amenity, radiusMeters)
      : ["map", "nearby", null],
    queryFn: () => (coords ? fetchNearbyPlaces(coords, amenity, radiusMeters) : []),
    enabled: (options?.enabled ?? true) && !!coords,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false
  })
}

export interface SimpleWeather {
  tempC: number
  condition: string
  emoji: string
  precipChance: number
  windKph: number
  humidity: number
}

async function fetchWeather(coords: Coordinates): Promise<SimpleWeather> {
  const params = new URLSearchParams({
    latitude: String(coords.lat),
    longitude: String(coords.lng),
    current: "temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m,weather_code",
    wind_speed_unit: "kmh",
    timezone: "auto"
  })
  const res = await axios.get(`https://api.open-meteo.com/v1/forecast?${params}`)
  const data = res.data
  const c = data.current ?? {}

  const wmoToEmoji = (code: number): { emoji: string; condition: string } => {
    if (code === 0) return { emoji: "☀️", condition: "Clear" }
    if (code <= 3) return { emoji: "⛅", condition: "Partly Cloudy" }
    if (code <= 48) return { emoji: "☁️", condition: "Overcast" }
    if (code <= 67) return { emoji: "🌧️", condition: "Rainy" }
    if (code <= 77) return { emoji: "❄️", condition: "Snow" }
    if (code <= 99) return { emoji: "⛈️", condition: "Thunderstorm" }
    return { emoji: "🌤️", condition: "Unknown" }
  }

  const { emoji, condition } = wmoToEmoji(c.weather_code ?? 0)
  return {
    tempC: Math.round(c.temperature_2m ?? 20),
    condition,
    emoji,
    precipChance: c.precipitation_probability ?? 0,
    windKph: Math.round(c.wind_speed_10m ?? 0),
    humidity: c.relative_humidity_2m ?? 50
  }
}

export function useWeather(
  coords: Coordinates | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: coords ? MAP_QUERY_KEYS.weather(coords) : ["map", "weather", null],
    queryFn: () => (coords ? fetchWeather(coords) : null),
    enabled: (options?.enabled ?? true) && !!coords,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false
  })
}
