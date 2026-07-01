export interface Destination {
  id: string
  name: string
  country: string
  imageUrl: string
  matchScore: number
  description: string
  budget: number
  bestSeason: string
  isFavorite?: boolean
}

export interface HiddenGem {
  id: string
  name: string
  country: string
  imageUrl: string
  description: string
  discoveryScore: number
  cost: number
  duration: string
  isBookmarked?: boolean
}

export interface Category {
  id: string
  label: string
  emoji: string
  destinationCount: number
}

export interface TrendingItem {
  id: string
  name: string
  country: string
  imageUrl: string
  popularityScore: number
  growthPercentage: number
  avgTemp: string
  bestMonth: string
}

export interface DiscoverState {
  searchQuery: string
  activeCategory: string
  favorites: string[]
  bookmarks: string[]
  isAIChatOpen: boolean
  
  setSearchQuery: (query: string) => void
  setActiveCategory: (category: string) => void
  toggleFavorite: (id: string) => void
  toggleBookmark: (id: string) => void
  setAIChatOpen: (isOpen: boolean) => void
  resetDiscoverStore: () => void
}
