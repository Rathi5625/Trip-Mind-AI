// ─────────────────────────────────────────────────────────────────────────────
// Core Coordinate Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Coordinates {
  lng: number
  lat: number
}

export interface BoundingBox {
  sw: Coordinates
  ne: Coordinates
}

// ─────────────────────────────────────────────────────────────────────────────
// Camera State
// ─────────────────────────────────────────────────────────────────────────────

export interface CameraState {
  center: Coordinates
  zoom: number
  pitch: number
  bearing: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Map Theme
// ─────────────────────────────────────────────────────────────────────────────

export type ThemeId =
  | "liberty"
  | "bright"
  | "fiord"
  | "light"
  | "dark"
  | "satellite"
  | "terrain"
  | "positron"
  | "dark-matter"

export interface Theme {
  id: ThemeId
  label: string
  url: string
  icon: string
  isDark: boolean
  category: "standard" | "satellite" | "terrain" | "minimal"
}

// ─────────────────────────────────────────────────────────────────────────────
// Map Layers
// ─────────────────────────────────────────────────────────────────────────────

export type LayerId =
  // AI layers
  | "ai-recommendations"
  | "budget-heatmap"
  | "hidden-gems"
  | "crowd-heatmap"
  | "safety-score"
  | "visa-layer"
  | "currency-layer"
  // Transport
  | "traffic"
  | "transport-layer"
  | "walking-routes"
  | "driving-routes"
  | "cycling-routes"
  | "airports"
  | "train-stations"
  // Weather
  | "weather"
  // Events & POI
  | "events"
  | "hotels"
  | "restaurants"
  | "museums"
  | "tourist-attractions"
  | "hidden-gems-poi"
  // Travel data
  | "flight-prices"
  | "hotel-availability"
  | "restaurant-ratings"
  // Terrain
  | "terrain"
  | "3d-buildings"
  // User
  | "saved-places"
  | "user-trips"

export interface Layer {
  id: LayerId
  label: string
  icon: string
  enabled: boolean
  category: "ai" | "transport" | "weather" | "pois" | "terrain" | "user"
  description?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Travel Route
// ─────────────────────────────────────────────────────────────────────────────

export type RouteProfile = "driving" | "walking" | "cycling"

export interface TravelRoute {
  id: string
  profile: RouteProfile
  waypoints: Coordinates[]
  geojson: GeoJSON.Feature<GeoJSON.LineString>
  distance: number // meters
  duration: number // seconds
  steps?: RouteStep[]
}

export interface RouteStep {
  instruction: string
  distance: number
  duration: number
  coordinates: Coordinates
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather Overlay
// ─────────────────────────────────────────────────────────────────────────────

export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy"
  | "windy"

export interface WeatherOverlay {
  coordinates: Coordinates
  condition: WeatherCondition
  tempC: number
  humidity: number
  windKph: number
  precipChance: number
  emoji: string
  description: string
  timestamp: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Cluster
// ─────────────────────────────────────────────────────────────────────────────

export interface ClusterConfig {
  enabled: boolean
  radius: number
  maxZoom: number
  minPoints: number
  extent: number
  nodeSize: number
}

export interface ClusterPoint {
  id: string
  coordinates: Coordinates
  count?: number     // set when it's a cluster
  isCluster: boolean
  clusterId?: number
  properties: Record<string, unknown>
}

// ─────────────────────────────────────────────────────────────────────────────
// Saved Place
// ─────────────────────────────────────────────────────────────────────────────

export interface SavedPlace {
  id: string
  destinationId: string
  name: string
  coordinates: Coordinates
  savedAt: number
  note?: string
  category?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Full Map State (Zustand)
// ─────────────────────────────────────────────────────────────────────────────

export interface MapState {
  // Camera
  camera: CameraState

  // Theme / style
  themeId: ThemeId

  // Layers
  activeLayers: Partial<Record<LayerId, boolean>>

  // Markers & selection
  selectedMarkerId: string | null
  hoveredMarkerId: string | null

  // Popup
  activePopupId: string | null

  // User location
  userLocation: Coordinates | null
  isLocating: boolean

  // Saved & selected
  savedPlaceIds: Set<string>
  selectedDestinationId: string | null

  // Routes
  activeRoute: TravelRoute | null

  // Cluster
  clusterConfig: ClusterConfig

  // Filters
  activeFilters: string[]

  // Status
  isMapReady: boolean
  isLoading: boolean
  mapError: string | null
  isSidebarOpen: boolean
  isFullscreen: boolean
}

export interface MapActions {
  // Camera
  setCamera: (camera: Partial<CameraState>) => void
  resetCamera: () => void

  // Theme
  setThemeId: (id: ThemeId) => void

  // Layers
  toggleLayer: (id: LayerId) => void
  setLayerEnabled: (id: LayerId, enabled: boolean) => void
  resetLayers: () => void

  // Markers & selection
  setSelectedMarkerId: (id: string | null) => void
  setHoveredMarkerId: (id: string | null) => void

  // Popup
  setActivePopupId: (id: string | null) => void

  // User location
  setUserLocation: (coords: Coordinates | null) => void
  setIsLocating: (v: boolean) => void

  // Saved places
  toggleSavedPlace: (id: string) => void
  clearSavedPlaces: () => void

  // Selected destination
  setSelectedDestinationId: (id: string | null) => void

  // Routes
  setActiveRoute: (route: TravelRoute | null) => void
  clearRoute: () => void

  // Cluster
  setClusterConfig: (config: Partial<ClusterConfig>) => void
  toggleClustering: () => void

  // Filters
  toggleFilter: (filter: string) => void
  setFilters: (filters: string[]) => void
  clearFilters: () => void

  // Status
  setIsMapReady: (v: boolean) => void
  setIsLoading: (v: boolean) => void
  setMapError: (err: string | null) => void
  toggleSidebar: () => void
  toggleFullscreen: () => void
}

export type MapStore = MapState & MapActions
