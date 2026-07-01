import type { Coordinates } from "./map"

// ─────────────────────────────────────────────────────────────────────────────
// Marker Types
// ─────────────────────────────────────────────────────────────────────────────

export type MarkerType =
  | "destination"
  | "hotel"
  | "restaurant"
  | "airport"
  | "train-station"
  | "museum"
  | "attraction"
  | "event"
  | "hidden-gem"
  | "user-location"
  | "saved"
  | "ai-recommended"
  | "route-waypoint"

export type MarkerSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface MarkerStyle {
  color: string
  bgColor: string
  borderColor: string
  iconEmoji?: string
  size: MarkerSize
}

// ─────────────────────────────────────────────────────────────────────────────
// Map Marker
// ─────────────────────────────────────────────────────────────────────────────

export interface MapMarker {
  id: string
  type: MarkerType
  coordinates: Coordinates
  label?: string
  imageUrl?: string
  color?: string
  size?: MarkerSize
  isAnimated?: boolean
  isPulsing?: boolean
  isSelected?: boolean
  isHovered?: boolean
  badge?: string | number
  elevation?: number
  zIndex?: number
  // Arbitrary metadata for popups/actions
  data?: Record<string, unknown>
}

// ─────────────────────────────────────────────────────────────────────────────
// Popup
// ─────────────────────────────────────────────────────────────────────────────

export type PopupAction = {
  id: string
  label: string
  icon?: string
  variant: "primary" | "secondary" | "ghost" | "danger"
  handler: () => void
}

export interface MarkerPopup {
  markerId: string
  title: string
  subtitle?: string
  description?: string
  imageUrl?: string
  thumbnailUrl?: string
  matchScore?: number
  rating?: number
  reviewCount?: number
  price?: string
  priceLevel?: "budget" | "mid-range" | "luxury"
  crowdLevel?: string
  isSaved?: boolean
  badges?: string[]
  actions?: PopupAction[]
  coordinates: Coordinates
}
