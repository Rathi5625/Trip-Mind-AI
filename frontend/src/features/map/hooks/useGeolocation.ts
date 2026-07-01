"use client"

import { useCallback } from "react"
import { useMapStore } from "../store/mapStore"
import type { Coordinates } from "../types/map"

export function useGeolocation() {
  const userLocation = useMapStore((s) => s.userLocation)
  const isLocating = useMapStore((s) => s.isLocating)
  const setUserLocation = useMapStore((s) => s.setUserLocation)
  const setIsLocating = useMapStore((s) => s.setIsLocating)
  const setMapError = useMapStore((s) => s.setMapError)

  const getCurrentLocation = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setMapError("Geolocation is not supported by your browser.")
      return
    }

    setIsLocating(true)
    setMapError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        }
        setUserLocation(coords)
        setIsLocating(false)
      },
      (error) => {
        setIsLocating(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setMapError("Location permission denied by user.")
            break
          case error.POSITION_UNAVAILABLE:
            setMapError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setMapError("Location request timed out.")
            break
          default:
            setMapError("An unknown error occurred while retrieving location.")
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }, [setUserLocation, setIsLocating, setMapError])

  const clearLocation = useCallback(() => {
    setUserLocation(null)
    setMapError(null)
  }, [setUserLocation, setMapError])

  return {
    userLocation,
    isLocating,
    getCurrentLocation,
    clearLocation
  }
}
