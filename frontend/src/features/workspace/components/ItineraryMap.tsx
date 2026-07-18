"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"

interface ItineraryMapProps {
  activities: any[]
  tripId?: string
  destinationName?: string
}

export function ItineraryMap({ activities, tripId, destinationName }: ItineraryMapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null)
  const map = React.useRef<any>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    let isMounted = true

    const loadMap = async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default
        await import("maplibre-gl/dist/maplibre-gl.css" as any)

        if (!mapContainer.current || !isMounted) return

        // Detect dark mode theme
        const isDark = document.documentElement.classList.contains("dark")
        const styleUrl = isDark
          ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"

        // Initial default center: [lng, lat]
        let center: [number, number] = [2.3522, 48.8566]
        let zoom = 12
        let markersData: any[] = []
        let routeWaypoints: Array<[number, number]> = []

        // Attempt fetching dynamic backend map data for this trip
        if (tripId) {
          try {
            const data = await apiClient.get<any>(API_ENDPOINTS.MAP.TRIP(tripId))
            if (data?.center?.lng && data?.center?.lat) {
              center = [data.center.lng, data.center.lat]
            }
            if (data?.markers && Array.isArray(data.markers)) {
              markersData = data.markers
            }
            if (data?.routeWaypoints && Array.isArray(data.routeWaypoints)) {
              routeWaypoints = data.routeWaypoints.map((w: any) => [w[1], w[0]]) // convert [lat, lng] to [lng, lat]
            }
          } catch (e) {
            console.warn("[ItineraryMap] Backend trip map data unavailable:", e)
          }
        } else if (destinationName) {
          try {
            const data = await apiClient.get<any>(API_ENDPOINTS.MAP.DESTINATION(destinationName))
            if (data?.center?.lng && data?.center?.lat) {
              center = [data.center.lng, data.center.lat]
            }
            if (data?.markers && Array.isArray(data.markers)) {
              markersData = data.markers
            }
          } catch (_) {}
        }

        // Initialize MapLibre Instance
        if (map.current) {
          map.current.remove()
        }

        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: styleUrl,
          center: center,
          zoom: zoom,
        })

        map.current.on("load", () => {
          if (!isMounted) return

          const bounds = new maplibregl.LngLatBounds()
          let hasBounds = false

          // Render dynamic markers
          if (markersData.length > 0) {
            markersData.forEach((m: any, idx: number) => {
              const lng = m.coordinates?.lng
              const lat = m.coordinates?.lat
              if (lng && lat) {
                bounds.extend([lng, lat])
                hasBounds = true

                // Custom DOM element for marker
                const el = document.createElement("div")
                el.className = "flex items-center justify-center size-7 rounded-full text-white text-[10px] font-black shadow-lg border-2 border-white cursor-pointer transition-transform hover:scale-110"
                
                if (m.category === "destination") {
                  el.style.backgroundColor = "#2563EB"
                  el.innerText = "★"
                } else if (m.category === "hotel") {
                  el.style.backgroundColor = "#7C3AED"
                  el.innerText = "🏨"
                } else if (m.category === "restaurant") {
                  el.style.backgroundColor = "#F97316"
                  el.innerText = "🍽️"
                } else if (m.category === "attraction") {
                  el.style.backgroundColor = "#3B82F6"
                  el.innerText = "📍"
                } else {
                  el.style.backgroundColor = "#0EA5E9"
                  el.innerText = String(m.sequence || idx + 1)
                }

                new maplibregl.Marker({ element: el })
                  .setLngLat([lng, lat])
                  .setPopup(
                    new maplibregl.Popup({ offset: 25 }).setHTML(
                      `<div class="p-2 font-sans text-left">
                        <h4 class="text-xs font-black text-slate-800">${m.title || "Location"}</h4>
                        <p class="text-[10px] text-slate-500 mt-0.5">${m.address || m.category || ""}</p>
                      </div>`
                    )
                  )
                  .addTo(map.current)
              }
            })
          } else if (activities && activities.length > 0) {
            // Fallback marker rendering for passed activity props
            activities.forEach((act: any, idx: number) => {
              if (act.longitude && act.latitude) {
                const lng = act.longitude
                const lat = act.latitude
                bounds.extend([lng, lat])
                hasBounds = true

                new maplibregl.Marker()
                  .setLngLat([lng, lat])
                  .setPopup(
                    new maplibregl.Popup({ offset: 25 }).setHTML(
                      `<div class="p-2 font-sans text-left"><h4 class="text-xs font-black text-slate-800">${act.name}</h4><p class="text-[10px] text-slate-400 mt-0.5">${act.address || ""}</p></div>`
                    )
                  )
                  .addTo(map.current)
              }
            })
          }

          // Draw route polyline if waypoints available
          if (routeWaypoints.length >= 2) {
            map.current.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: routeWaypoints,
                },
              },
            })

            map.current.addLayer({
              id: "route-line",
              type: "line",
              source: "route",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#2563EB",
                "line-width": 4,
                "line-dasharray": [2, 1],
              },
            })
          }

          if (hasBounds) {
            map.current.fitBounds(bounds, { padding: 60, maxZoom: 15 })
          }

          setIsLoaded(true)
        })
      } catch (err) {
        console.error("Error rendering MapLibre GL map:", err)
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
  }, [activities, tripId, destinationName])

  return (
    <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 relative bg-slate-50 dark:bg-slate-900/50 shadow-inner flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900/40 z-10">
          <Loader2 className="size-6 text-primary-blue animate-spin" />
          <span className="text-[10px] font-bold text-slate-400">Loading dynamic map engine...</span>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}
export default ItineraryMap
