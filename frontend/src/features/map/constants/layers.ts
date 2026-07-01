import type { Layer } from "../types/map"

// ─────────────────────────────────────────────────────────────────────────────
// All application layers — toggled via Zustand store + LayerSwitcher
// ─────────────────────────────────────────────────────────────────────────────

export const MAP_LAYERS: Layer[] = [
  // ── AI Layers ────────────────────────────────────────────────────────────
  {
    id: "ai-recommendations",
    label: "AI Picks",
    icon: "✦",
    enabled: true,
    category: "ai",
    description: "Atlas AI curated destination recommendations"
  },
  {
    id: "budget-heatmap",
    label: "Budget Heatmap",
    icon: "💰",
    enabled: false,
    category: "ai",
    description: "Color-coded travel cost by region"
  },
  {
    id: "hidden-gems",
    label: "Hidden Gems",
    icon: "💎",
    enabled: false,
    category: "ai",
    description: "AI-discovered lesser-known destinations"
  },
  {
    id: "crowd-heatmap",
    label: "Crowd Density",
    icon: "👥",
    enabled: false,
    category: "ai",
    description: "Real-time tourist crowd density"
  },
  {
    id: "safety-score",
    label: "Safety Score",
    icon: "🛡️",
    enabled: false,
    category: "ai",
    description: "Travel safety ratings by country"
  },
  {
    id: "visa-layer",
    label: "Visa Required",
    icon: "🛂",
    enabled: false,
    category: "ai",
    description: "Visa requirements by nationality"
  },
  {
    id: "currency-layer",
    label: "Currency",
    icon: "💱",
    enabled: false,
    category: "ai",
    description: "Live exchange rate overlays"
  },
  {
    id: "flight-prices",
    label: "Flight Prices",
    icon: "✈️",
    enabled: false,
    category: "ai",
    description: "Live flight price heatmap"
  },
  {
    id: "hotel-availability",
    label: "Hotels",
    icon: "🏨",
    enabled: false,
    category: "ai",
    description: "Hotel availability and pricing"
  },
  // ── Transport Layers ─────────────────────────────────────────────────────
  {
    id: "traffic",
    label: "Traffic",
    icon: "🚗",
    enabled: false,
    category: "transport",
    description: "Real-time traffic conditions"
  },
  {
    id: "airports",
    label: "Airports",
    icon: "🛫",
    enabled: false,
    category: "transport",
    description: "International and regional airports"
  },
  {
    id: "train-stations",
    label: "Train Stations",
    icon: "🚂",
    enabled: false,
    category: "transport",
    description: "Rail and metro stations"
  },
  {
    id: "walking-routes",
    label: "Walking",
    icon: "🚶",
    enabled: false,
    category: "transport",
    description: "Best walking routes"
  },
  {
    id: "driving-routes",
    label: "Driving",
    icon: "🚘",
    enabled: false,
    category: "transport",
    description: "Road trip routing"
  },
  {
    id: "cycling-routes",
    label: "Cycling",
    icon: "🚴",
    enabled: false,
    category: "transport",
    description: "Cycling-friendly routes"
  },
  // ── Weather ──────────────────────────────────────────────────────────────
  {
    id: "weather",
    label: "Weather",
    icon: "🌤️",
    enabled: false,
    category: "weather",
    description: "7-day weather forecast overlay"
  },
  // ── POIs ─────────────────────────────────────────────────────────────────
  {
    id: "events",
    label: "Events",
    icon: "🎉",
    enabled: false,
    category: "pois",
    description: "Festivals, concerts, and local events"
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: "🏨",
    enabled: false,
    category: "pois",
    description: "Hotels and accommodation"
  },
  {
    id: "restaurants",
    label: "Restaurants",
    icon: "🍽️",
    enabled: false,
    category: "pois",
    description: "Local dining recommendations"
  },
  {
    id: "museums",
    label: "Museums",
    icon: "🏛️",
    enabled: false,
    category: "pois",
    description: "Museums and art galleries"
  },
  {
    id: "tourist-attractions",
    label: "Attractions",
    icon: "📍",
    enabled: false,
    category: "pois",
    description: "Top tourist attractions"
  },
  {
    id: "restaurant-ratings",
    label: "Restaurant Ratings",
    icon: "⭐",
    enabled: false,
    category: "pois",
    description: "AI-curated dining ratings"
  },
  // ── Terrain ──────────────────────────────────────────────────────────────
  {
    id: "terrain",
    label: "Terrain",
    icon: "⛰️",
    enabled: false,
    category: "terrain",
    description: "3D terrain visualization"
  },
  {
    id: "3d-buildings",
    label: "3D Buildings",
    icon: "🏙️",
    enabled: false,
    category: "terrain",
    description: "3D building extrusions"
  },
  // ── User ─────────────────────────────────────────────────────────────────
  {
    id: "saved-places",
    label: "Saved Places",
    icon: "❤️",
    enabled: false,
    category: "user",
    description: "Your saved destinations"
  },
  {
    id: "user-trips",
    label: "My Trips",
    icon: "🗓️",
    enabled: false,
    category: "user",
    description: "Your past and upcoming trips"
  }
]

export const LAYER_CATEGORIES = [
  { id: "ai", label: "AI Intelligence", icon: "🤖" },
  { id: "transport", label: "Transport", icon: "🚗" },
  { id: "weather", label: "Weather", icon: "🌤️" },
  { id: "pois", label: "Places", icon: "📍" },
  { id: "terrain", label: "Terrain", icon: "⛰️" },
  { id: "user", label: "My Data", icon: "👤" }
] as const

// Default layer initial state
export const DEFAULT_ACTIVE_LAYERS: Partial<Record<import("../types/map").LayerId, boolean>> =
  Object.fromEntries(MAP_LAYERS.map((l) => [l.id, l.enabled]))
