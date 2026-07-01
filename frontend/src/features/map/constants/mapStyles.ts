import type { Theme, ThemeId, CameraState, ClusterConfig } from "../types/map"

// ─────────────────────────────────────────────────────────────────────────────
// Free MapLibre Style URLs — No API key required
// All sourced from OpenFreeMap and Carto
// ─────────────────────────────────────────────────────────────────────────────

export const MAP_STYLE_URLS: Record<ThemeId, string> = {
  // OpenFreeMap (100% free, no key)
  liberty: "https://tiles.openfreemap.org/styles/liberty",
  bright:  "https://tiles.openfreemap.org/styles/bright",
  fiord:   "https://tiles.openfreemap.org/styles/fiord",

  // Carto free styles (no key)
  light:       "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  positron:    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark:        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  "dark-matter":"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",

  // Satellite / Terrain placeholders (architecture-ready)
  // Replace with your tile provider if needed
  satellite: "https://tiles.openfreemap.org/styles/liberty",
  terrain:   "https://tiles.openfreemap.org/styles/liberty"
}

// ─────────────────────────────────────────────────────────────────────────────
// Theme Registry
// ─────────────────────────────────────────────────────────────────────────────

export const MAP_THEMES: Theme[] = [
  {
    id: "liberty",
    label: "Liberty",
    url: MAP_STYLE_URLS.liberty,
    icon: "🗺️",
    isDark: false,
    category: "standard"
  },
  {
    id: "bright",
    label: "Bright",
    url: MAP_STYLE_URLS.bright,
    icon: "☀️",
    isDark: false,
    category: "standard"
  },
  {
    id: "fiord",
    label: "Fiord",
    url: MAP_STYLE_URLS.fiord,
    icon: "🌊",
    isDark: true,
    category: "standard"
  },
  {
    id: "light",
    label: "Light",
    url: MAP_STYLE_URLS.light,
    icon: "🔆",
    isDark: false,
    category: "minimal"
  },
  {
    id: "dark",
    label: "Dark",
    url: MAP_STYLE_URLS.dark,
    icon: "🌙",
    isDark: true,
    category: "minimal"
  },
  {
    id: "satellite",
    label: "Satellite",
    url: MAP_STYLE_URLS.satellite,
    icon: "🛰️",
    isDark: false,
    category: "satellite"
  },
  {
    id: "terrain",
    label: "Terrain",
    url: MAP_STYLE_URLS.terrain,
    icon: "⛰️",
    isDark: false,
    category: "terrain"
  }
]

export const DEFAULT_THEME_ID: ThemeId = "liberty"
export const DEFAULT_DARK_THEME_ID: ThemeId = "dark"

// ─────────────────────────────────────────────────────────────────────────────
// Default Camera State
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_CAMERA: CameraState = {
  center: { lng: 12, lat: 28 },
  zoom: 2.5,
  pitch: 0,
  bearing: 0
}

export const MIN_ZOOM = 0.5
export const MAX_ZOOM = 22

// ─────────────────────────────────────────────────────────────────────────────
// Default Cluster Config
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_CLUSTER_CONFIG: ClusterConfig = {
  enabled: true,
  radius: 60,
  maxZoom: 14,
  minPoints: 3,
  extent: 512,
  nodeSize: 64
}

// ─────────────────────────────────────────────────────────────────────────────
// Fly-to animation defaults
// ─────────────────────────────────────────────────────────────────────────────

export const FLY_TO_DURATION = 1400 // ms
export const FLY_TO_CURVE = 1.42

// ─────────────────────────────────────────────────────────────────────────────
// Marker colors by type
// ─────────────────────────────────────────────────────────────────────────────

export const MARKER_COLORS: Record<string, string> = {
  destination:    "#2563EB",
  hotel:          "#7C3AED",
  restaurant:     "#F97316",
  airport:        "#64748B",
  "train-station": "#0EA5E9",
  museum:         "#10B981",
  attraction:     "#3B82F6",
  event:          "#EC4899",
  "hidden-gem":   "#EAB308",
  "user-location": "#06B6D4",
  saved:          "#EF4444",
  "ai-recommended": "#8B5CF6",
  "route-waypoint": "#1D4ED8"
}

// ─────────────────────────────────────────────────────────────────────────────
// Free tile sources (OSM-compatible, no API key)
// ─────────────────────────────────────────────────────────────────────────────

export const TILE_SOURCES = {
  openstreetmap: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  cartoLight:    "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  cartoDark:     "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  stamenToner:   "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
} as const
