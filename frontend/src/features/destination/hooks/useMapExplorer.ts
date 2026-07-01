import { useQuery } from "@tanstack/react-query"

export interface MapMarker {
  id: string
  name: string
  lat: number
  lng: number
  category: "Museum" | "Restaurant" | "Hotel" | "Metro" | "Shopping" | "Hidden Gem"
}

export function useMapExplorer() {
  // Mock markers inside Paris, France matching screenshots
  const markers: MapMarker[] = [
    { id: "m1", name: "Louvre Museum", lat: 48.8606, lng: 2.3376, category: "Museum" },
    { id: "m2", name: "Le Marais district", lat: 48.8576, lng: 2.3606, category: "Hidden Gem" },
    { id: "m3", name: "Boutique Hotel Gion", lat: 48.8586, lng: 2.3486, category: "Hotel" }
  ]

  return {
    markers,
    isLoading: false
  }
}
