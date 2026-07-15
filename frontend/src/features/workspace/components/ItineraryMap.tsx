"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

interface ItineraryMapProps {
  activities: any[]
}

export function ItineraryMap({ activities }: ItineraryMapProps) {
  const mapContainer = React.useRef<HTMLDivElement>(null)
  const map = React.useRef<any>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    // Lazy load MapLibre GL JS on client-side only
    const loadMap = async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default
        await import("maplibre-gl/dist/maplibre-gl.css" as any)

        if (!mapContainer.current) return

        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
          center: [139.767, 35.681],
          zoom: 12
        })

        // Standard mock coordinates for Tokyo City Tour
        const coordinates: Array<[number, number]> = [
          [139.7967, 35.7148], // Sensoji
          [139.7715, 35.6997], // Akihabara
          [139.8107, 35.7101]  // Skytree
        ]

        coordinates.forEach((coord, idx) => {
          if (idx < activities.length) {
            new maplibregl.Marker()
              .setLngLat(coord)
              .setPopup(
                new maplibregl.Popup({ offset: 25 }).setHTML(
                  `<div class="p-1.5 font-sans"><h3 class="text-xs font-black text-slate-800">${activities[idx].name}</h3><p class="text-[10px] text-slate-400 mt-0.5">${activities[idx].address || ""}</p></div>`
                )
              )
              .addTo(map.current)
          }
        })

        if (activities.length > 0) {
          map.current.setCenter(coordinates[0])
        }

        setIsLoaded(true)
      } catch (err) {
        console.error("Error rendering MapLibre GL map:", err)
      }
    }

    loadMap()

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [activities])

  return (
    <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 relative bg-slate-50 dark:bg-slate-900/50 shadow-inner flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-900/40 z-10">
          <Loader2 className="size-6 text-primary-blue animate-spin" />
          <span className="text-[10px] font-bold text-slate-400">Loading MapLibre engine...</span>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}
export default ItineraryMap
