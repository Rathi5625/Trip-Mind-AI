import type { Coordinates } from "./map"

// ─────────────────────────────────────────────────────────────────────────────
// Destination
// ─────────────────────────────────────────────────────────────────────────────

export type DestinationCategory =
  | "city"
  | "beach"
  | "nature"
  | "cultural"
  | "adventure"
  | "luxury"
  | "family"
  | "heritage"
  | "mountains"
  | "island"

export type CrowdLevel = "very-low" | "low" | "moderate" | "high" | "very-high"

export interface DestinationWeather {
  condition: string
  emoji: string
  tempC: number
  precipChance: number
  bestMonths: string[]
}

export interface DestinationBudget {
  level: "budget" | "mid-range" | "luxury"
  avgDailyUSD: number
  currency: string
  currencySymbol: string
  exchangeRate: number
}

export interface VisaInfo {
  requiresVisa: boolean
  onArrival: boolean
  eVisa: boolean
  freeDays: number
  processingDays?: number
}

export interface Destination {
  id: string
  name: string
  country: string
  countryCode: string
  continent: string
  coordinates: Coordinates
  category: DestinationCategory
  tags: string[]

  // AI scores
  matchScore: number       // 0–100
  aiRank: number           // 1-based ranking
  popularityScore: number  // 0–100

  // Pricing
  avgFlightUSD: string
  budget: DestinationBudget

  // Crowd & timing
  crowdLevel: CrowdLevel
  bestSeason: string
  isTrending: boolean
  isHiddenGem: boolean

  // Media
  imageUrl: string
  thumbnailUrl?: string
  heroVideoUrl?: string
  gallery?: string[]

  // Content
  shortDescription: string
  aiSummary?: string
  highlights: string[]
  languages: string[]

  // Ratings & social proof
  rating: number         // 1–5
  reviewCount: number
  savedCount: number

  // Data
  weather?: DestinationWeather
  visa?: VisaInfo
  safetyScore?: number   // 0–100

  // User-specific
  isSaved?: boolean
  isVisited?: boolean
}
