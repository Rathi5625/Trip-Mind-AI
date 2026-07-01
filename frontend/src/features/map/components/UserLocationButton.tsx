"use client"

import * as React from "react"
import { Navigation, Loader2 } from "lucide-react"
import { useGeolocation } from "../hooks/useGeolocation"
import { useMapCamera } from "../hooks/useMapCamera"
import { useMapStore } from "../store/mapStore"

export function UserLocationButton() {
  const { flyTo } = useMapCamera()
  const { userLocation, isLocating, getCurrentLocation } = useGeolocation()
  const isMapReady = useMapStore((s) => s.isMapReady)

  const handleLocate = () => {
    getCurrentLocation()
    if (userLocation) {
      flyTo(userLocation, 12)
    }
  }

  // React to successful location update
  React.useEffect(() => {
    if (userLocation && isMapReady) {
      flyTo(userLocation, 12)
    }
  }, [userLocation, isMapReady, flyTo])

  const hasLocation = !!userLocation

  return (
    <button
      onClick={handleLocate}
      disabled={isLocating || !isMapReady}
      className={`flex items-center justify-center size-8 rounded-xl
        transition-all cursor-pointer border-0 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50
        ${hasLocation
          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-500/20"
          : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        }`}
      aria-label={isLocating ? "Retrieving location…" : "Find my location"}
      title="Find my location"
    >
      {isLocating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Navigation className={`size-4 ${hasLocation ? "fill-blue-600 dark:fill-blue-400" : ""}`} strokeWidth={1.75} />
      )}
    </button>
  )
}
