"use client"

import * as React from "react"
import { Compass, Plus, Minus, Info, Loader2 } from "lucide-react"
import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"

interface InteractiveMapProps {
  destinationId?: string
  destinationName?: string
}

export function InteractiveMap({ destinationId = "paris", destinationName = "Paris" }: InteractiveMapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null)
  const map = React.useRef<any>(null)
  const [zoom, setZoom] = React.useState(12)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hubInfo, setHubInfo] = React.useState<{ name: string; description: string }>({
    name: "Central Hub",
    description: "Top-rated area for hotels, dining, and landmarks."
  })

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

        let center: [number, number] = [2.3522, 48.8566]
        let markersData: any[] = []

        try {
          const data = await apiClient.get<any>(API_ENDPOINTS.MAP.DESTINATION(destinationId))
          if (data?.center?.lng && data?.center?.lat) {
            center = [data.center.lng, data.center.lat]
          }
          if (data?.markers && Array.isArray(data.markers)) {
            markersData = data.markers
          }
          if (data?.destinationName) {
            setHubInfo({
              name: `${data.destinationName} Central`,
              description: `Explore top attractions, dining, and accommodations in ${data.destinationName}.`
            })
          }
        } catch (e) {
          console.warn("[InteractiveMap] Destination map data unavailable:", e)
        }

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

          if (markersData.length > 0) {
            markersData.forEach((m: any, idx: number) => {
              const lng = m.coordinates?.lng
              const lat = m.coordinates?.lat
              if (lng && lat) {
                bounds.extend([lng, lat])
                hasBounds = true

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
                  el.innerText = String(idx + 1)
                }

                new maplibregl.Marker({ element: el })
                  .setLngLat([lng, lat])
                  .setPopup(
                    new maplibregl.Popup({ offset: 25 }).setHTML(
                      `<div class="p-2 font-sans text-left">
                        <h4 class="text-xs font-black text-slate-800">${m.title || "Place"}</h4>
                        <p class="text-[10px] text-slate-500 mt-0.5">${m.address || m.cuisine || m.category || ""}</p>
                      </div>`
                    )
                  )
                  .addTo(map.current)
              }
            })
          }

          if (hasBounds) {
            map.current.fitBounds(bounds, { padding: 50, maxZoom: 14 })
          }

          setIsLoaded(true)
        })
      } catch (err) {
        console.error("Error rendering MapLibre GL destination map:", err)
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
  }, [destinationId, destinationName])

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn()
      setZoom(Math.round(map.current.getZoom()))
    }
  }

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut()
      setZoom(Math.round(map.current.getZoom()))
    }
  }

  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-4">
      <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
        Explore {destinationName} Map
      </h3>

      <div className="relative h-80 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 bg-slate-100 dark:bg-slate-900 shadow-md">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900/40 z-10">
            <Loader2 className="size-6 text-primary-blue animate-spin" />
            <span className="text-[10px] font-bold text-slate-400">Loading MapLibre map...</span>
          </div>
        )}

        <div ref={mapContainer} className="w-full h-full" />

        {/* Top-left Info Panel overlay */}
        <div className="absolute top-4 left-4 p-4 max-w-[240px] rounded-2xl border border-white/20 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-lg space-y-2 text-left z-20">
          <div className="flex items-center gap-1.5 text-[8.5px] font-black uppercase text-slate-400 tracking-wider">
            <Info className="size-3 text-blue-500" />
            <span>Suggested Hub</span>
          </div>
          <div className="space-y-0.5">
            <h5 className="text-[11px] font-black text-slate-805 dark:text-white leading-none">
              {hubInfo.name}
            </h5>
            <p className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
              {hubInfo.description}
            </p>
          </div>
        </div>

        {/* Right zoom controls +/- */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/5 shadow-md cursor-pointer"
            aria-label="Zoom in"
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/5 shadow-md cursor-pointer"
            aria-label="Zoom out"
          >
            <Minus className="size-4" />
          </button>
        </div>

        {/* Center compass watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <Compass className="size-10 text-slate-400" />
        </div>
      </div>
    </div>
  )
}
