"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Map, Navigation, Loader2 } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { MapData } from "../types/dashboard"
import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"

interface InteractiveMapProps {
  mapData: MapData
}

export function InteractiveMap({ mapData }: InteractiveMapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null)
  const map = React.useRef<any>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [userPins, setUserPins] = React.useState<any[]>([])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    let isMounted = true

    const loadMap = async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default
        await import("maplibre-gl/dist/maplibre-gl.css" as any)

        if (!mapContainer.current || !isMounted) return

        const isDark = document.documentElement.classList.contains("dark")
        const styleUrl = isDark
          ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"

        let fetchedPins: any[] = []
        try {
          const data = await apiClient.get<any[]>(API_ENDPOINTS.MAP.USER_TRIPS)
          if (Array.isArray(data) && data.length > 0) {
            fetchedPins = data
            setUserPins(data)
          }
        } catch (e) {
          console.warn("[Dashboard Map] User trips map API unavailable:", e)
        }

        if (map.current) {
          map.current.remove()
        }

        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: styleUrl,
          center: [15, 25],
          zoom: 1.8,
        })

        map.current.on("load", () => {
          if (!isMounted) return

          const bounds = new maplibregl.LngLatBounds()
          let hasBounds = false

          if (fetchedPins.length > 0) {
            fetchedPins.forEach((pin) => {
              const lng = pin.coordinates?.lng
              const lat = pin.coordinates?.lat
              if (lng && lat) {
                bounds.extend([lng, lat])
                hasBounds = true

                const el = document.createElement("div")
                const color = pin.status === "visited" ? "#94A3B8" : pin.status === "planned" ? "#2563EB" : "#F43F5E"
                el.className = "size-3.5 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-125"
                el.style.backgroundColor = color

                new maplibregl.Marker({ element: el })
                  .setLngLat([lng, lat])
                  .setPopup(
                    new maplibregl.Popup({ offset: 20 }).setHTML(
                      `<div class="p-2 font-sans text-left">
                        <h4 class="text-xs font-black text-slate-800">${pin.title || pin.destinationName}</h4>
                        <p class="text-[10px] text-slate-500 mt-0.5">${pin.destinationName} • ${pin.status}</p>
                      </div>`
                    )
                  )
                  .addTo(map.current)
              }
            })
          }

          if (hasBounds && fetchedPins.length > 1) {
            map.current.fitBounds(bounds, { padding: 40, maxZoom: 5 })
          }

          setIsLoaded(true)
        })
      } catch (err) {
        console.error("Error rendering MapLibre GL dashboard map:", err)
      }
    }

    loadMap()

    return () => {
      isMounted = false
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/70 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl w-full overflow-hidden select-none"
    >
      {/* Header & Stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-inner">
            <Map className="size-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
              Interactive Travel Map
            </h3>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
              Live destination pins & user trip locations
            </p>
          </div>
        </div>

        {/* Counts summary row */}
        <div className="flex items-center gap-4 bg-slate-50/50 border border-black/5 dark:bg-slate-950/20 dark:border-white/5 px-4 py-2 rounded-2xl shrink-0">
          <div className="text-center">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Visited
            </span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-200">
              {mapData.visitedCountries}
            </span>
          </div>
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Planned
            </span>
            <span className="text-sm font-black text-primary-blue">
              {mapData.plannedDestinations}
            </span>
          </div>
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="block text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Wishlist
            </span>
            <span className="text-sm font-black text-rose-400">
              {mapData.wishlistDestinations}
            </span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[320px] bg-slate-50/40 dark:bg-slate-950/20 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-inner">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900/40 z-10">
            <Loader2 className="size-6 text-primary-blue animate-spin" />
            <span className="text-[10px] font-bold text-slate-400">Loading travel map...</span>
          </div>
        )}

        <div ref={mapContainer} className="w-full h-full" />

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md border border-black/5 dark:bg-slate-900/80 dark:border-white/5 px-2.5 py-1.5 rounded-xl z-20 flex gap-3 text-[9px] font-bold text-slate-500 dark:text-slate-400 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-slate-400" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary-blue" />
            <span>Planned</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-rose-400" />
            <span>Wishlist</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
