export interface DestinationDetails {
  id: string
  name: string
  country: string
  rating: number
  matchScore: number
  imageUrls: string[]
  facts: {
    language: string
    currency: string
    timezone: string
    visaStatus: string
  }
  intelligence: {
    overallScore: number
    safetyScore: number
    crowdForecast: string
    avgDailyCost: string
    recommendedDuration: string
    weatherIntel: string
  }
}

export interface Attraction {
  id: string
  name: string
  category: string
  duration: string
  imageUrl: string
  description: string
  popularityScore: number
}

export interface BudgetOption {
  style: "Economy" | "Premium" | "Ultra Luxury"
  dailyBudget: string
  hotelSuggestions: string[]
  transportStyle: string
  foodSuggestions: string[]
  experiences: string[]
  isPopular?: boolean
}

export interface SecretItem {
  id: string
  title: string
  description: string
}

export interface SavingTip {
  id: string
  title: string
  description: string
}

export interface TimeSeason {
  name: string
  weather: string
  prices: string
  crowdLevel: string
  pros: string[]
  cons: string[]
  aiRecommendation: string
  isHighlighted?: boolean
}

export interface ComparisonVibe {
  id: string
  name: string
  image: string
  description: string
  similarityScore: number
}

export interface DestinationStoreState {
  isSaved: boolean
  selectedSeason: string
  selectedBudgetStyle: "Economy" | "Premium" | "Ultra Luxury"
  activeGalleryIndex: number | null
  
  toggleSaved: () => void
  setSelectedSeason: (season: string) => void
  setSelectedBudgetStyle: (style: "Economy" | "Premium" | "Ultra Luxury") => void
  setActiveGalleryIndex: (index: number | null) => void
  resetState: () => void
}

// ── New feature types ──────────────────────────────────────────────────────

export interface ForecastItem {
  label: string
  value: string
  trend: "up" | "down" | "stable"
  detail: string
  icon: string
}

export interface PlannerEvent {
  time: string
  title: string
  category: string
  duration: string
  icon: string
}

export interface SmartAlert {
  id: string
  type: "warning" | "savings" | "weather" | "transport" | "event"
  title: string
  description: string
}

export interface RecommendationItem {
  id: string
  name: string
  description: string
  imageUrl: string
  tags: string[]
}

export interface RecommendationCategory {
  key: string
  label: string
  emoji: string
  items: RecommendationItem[]
}
