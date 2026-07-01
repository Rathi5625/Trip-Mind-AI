export interface SearchDestination {
  id: string
  name: string
  country: string
  imageUrl: string
  matchScore: number
  description: string
  budgetPerPerson: number
  duration: string
  weatherText: string
  weatherTemp: string
  weatherIcon: string // 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy'
  
  // Hover preview stats
  restaurantsCount?: number
  attractionsCount?: number
  hotelsCount?: number
}

export interface GemDestination {
  id: string
  name: string
  country: string
  imageUrl: string
  description: string
  discoveryScore: number
  cost: number
  duration: string
}

export interface ComparisonCity {
  name: string
  budget: string
  budgetScore?: number // 0-100 for visual charts
  weather: string
  weatherScore?: number
  popularity: string
  popularityScore?: number
  food: string
  foodScore?: number
  safety: string
  safetyScore?: number
  nightlife?: string
  nightlifeScore?: number
  crowds?: string
  crowdsScore?: number
  bestSeason: string
  isBudgetBetter?: boolean
  isWeatherBetter?: boolean
  isPopularityBetter?: boolean
}

export interface SearchFilterState {
  budgetRange: [number, number]
  duration: string
  travelStyles: string[]
  minMatchScore: number
  sortBy: string
  activeSearchQuery: string
  activeChips: string[]
  activeAIFilters: string[]
  favorites: string[]

  setBudgetRange: (range: [number, number]) => void
  setDuration: (duration: string) => void
  toggleTravelStyle: (style: string) => void
  setMinMatchScore: (score: number) => void
  setSortBy: (sortBy: string) => void
  setActiveSearchQuery: (query: string) => void
  removeChip: (chip: string) => void
  toggleFavorite: (id: string) => void
  toggleAIFilter: (filter: string) => void
  resetFilters: () => void
}
