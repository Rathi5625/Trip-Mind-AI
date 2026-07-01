import { create } from "zustand"
import { subscribeWithSelector, persist } from "zustand/middleware"
import type { MapStore, LayerId, ThemeId, Coordinates, TravelRoute, ClusterConfig, CameraState } from "../types/map"
import { DEFAULT_CAMERA, DEFAULT_CLUSTER_CONFIG, DEFAULT_THEME_ID } from "../constants/mapStyles"
import { DEFAULT_ACTIVE_LAYERS } from "../constants/layers"

// ─────────────────────────────────────────────────────────────────────────────
// Zustand Store
// ─────────────────────────────────────────────────────────────────────────────

export const useMapStore = create<MapStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // ── Camera ───────────────────────────────────────────────────────────
        camera: DEFAULT_CAMERA,

        // ── Theme ────────────────────────────────────────────────────────────
        themeId: DEFAULT_THEME_ID,

        // ── Layers ───────────────────────────────────────────────────────────
        activeLayers: { ...DEFAULT_ACTIVE_LAYERS },

        // ── Markers & selection ───────────────────────────────────────────────
        selectedMarkerId: null,
        hoveredMarkerId: null,

        // ── Popup ─────────────────────────────────────────────────────────────
        activePopupId: null,

        // ── User ─────────────────────────────────────────────────────────────
        userLocation: null,
        isLocating: false,

        // ── Saved & selected ──────────────────────────────────────────────────
        savedPlaceIds: new Set<string>(),
        selectedDestinationId: null,

        // ── Routes ────────────────────────────────────────────────────────────
        activeRoute: null,

        // ── Cluster ───────────────────────────────────────────────────────────
        clusterConfig: DEFAULT_CLUSTER_CONFIG,

        // ── Filters ───────────────────────────────────────────────────────────
        activeFilters: [],

        // ── Status ────────────────────────────────────────────────────────────
        isMapReady: false,
        isLoading: true,
        mapError: null,
        isSidebarOpen: true,
        isFullscreen: false,

        // ── Actions ───────────────────────────────────────────────────────────

        setCamera: (camera) =>
          set((s) => ({ camera: { ...s.camera, ...camera } })),

        resetCamera: () => set({ camera: DEFAULT_CAMERA }),

        setThemeId: (id: ThemeId) => set({ themeId: id }),

        toggleLayer: (id: LayerId) =>
          set((s) => ({
            activeLayers: {
              ...s.activeLayers,
              [id]: !s.activeLayers[id]
            }
          })),

        setLayerEnabled: (id: LayerId, enabled: boolean) =>
          set((s) => ({
            activeLayers: { ...s.activeLayers, [id]: enabled }
          })),

        resetLayers: () =>
          set({ activeLayers: { ...DEFAULT_ACTIVE_LAYERS } }),

        setSelectedMarkerId: (id) =>
          set({
            selectedMarkerId: id,
            activePopupId: id ?? null
          }),

        setHoveredMarkerId: (id) => set({ hoveredMarkerId: id }),

        setActivePopupId: (id) => set({ activePopupId: id }),

        setUserLocation: (coords) => set({ userLocation: coords }),
        setIsLocating: (v) => set({ isLocating: v }),

        toggleSavedPlace: (id) =>
          set((s) => {
            const next = new Set(s.savedPlaceIds)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return { savedPlaceIds: next }
          }),

        clearSavedPlaces: () => set({ savedPlaceIds: new Set() }),

        setSelectedDestinationId: (id) => set({ selectedDestinationId: id }),

        setActiveRoute: (route) => set({ activeRoute: route }),
        clearRoute: () => set({ activeRoute: null }),

        setClusterConfig: (config) =>
          set((s) => ({
            clusterConfig: { ...s.clusterConfig, ...config }
          })),

        toggleClustering: () =>
          set((s) => ({
            clusterConfig: {
              ...s.clusterConfig,
              enabled: !s.clusterConfig.enabled
            }
          })),

        toggleFilter: (filter) =>
          set((s) => {
            const next = s.activeFilters.includes(filter)
              ? s.activeFilters.filter((f) => f !== filter)
              : [...s.activeFilters, filter]
            return { activeFilters: next }
          }),

        setFilters: (filters) => set({ activeFilters: filters }),
        clearFilters: () => set({ activeFilters: [] }),

        setIsMapReady: (v) => set({ isMapReady: v }),
        setIsLoading: (v) => set({ isLoading: v }),
        setMapError: (err) => set({ mapError: err }),
        toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
        toggleFullscreen: () => set((s) => ({ isFullscreen: !s.isFullscreen }))
      }),
      {
        name: "trip-mind-map",
        // Only persist non-ephemeral state
        partialize: (s) => ({
          themeId: s.themeId,
          savedPlaceIds: s.savedPlaceIds,
          activeLayers: s.activeLayers,
          clusterConfig: s.clusterConfig,
          isSidebarOpen: s.isSidebarOpen
        }),
        // Re-hydrate Set from serialized array
        merge: (persisted: any, current) => ({
          ...current,
          ...(persisted ?? {}),
          savedPlaceIds: new Set(persisted?.savedPlaceIds ?? [])
        })
      }
    )
  )
)

// ─────────────────────────────────────────────────────────────────────────────
// Typed selectors (for performance — subscribe to slices)
// ─────────────────────────────────────────────────────────────────────────────

export const selectCamera = (s: MapStore) => s.camera
export const selectThemeId = (s: MapStore) => s.themeId
export const selectActiveLayers = (s: MapStore) => s.activeLayers
export const selectSelectedMarkerId = (s: MapStore) => s.selectedMarkerId
export const selectActivePopupId = (s: MapStore) => s.activePopupId
export const selectUserLocation = (s: MapStore) => s.userLocation
export const selectSavedPlaceIds = (s: MapStore) => s.savedPlaceIds
export const selectActiveRoute = (s: MapStore) => s.activeRoute
export const selectIsMapReady = (s: MapStore) => s.isMapReady
export const selectClusterConfig = (s: MapStore) => s.clusterConfig
export const selectActiveFilters = (s: MapStore) => s.activeFilters
