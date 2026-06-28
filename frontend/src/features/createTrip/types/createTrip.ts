export interface Destination {
  id: string
  name: string
  country: string
  description: string
  matchScore: number
  category: string
  image: string
  priceRange: string
  bestSeason: string
  popularity: number // 1-100
  bestMonths: string
  confidence: number // 1-100
  attractions: string[]
  transport: string
  matchReasons: string[]
  tempRange: string
  flightDuration: string
  tripDuration: string
}

export type WizardStep = 1 | 2 | 3 | 4 | 5

export interface TripWizardState {
  step: WizardStep
  searchQuery: string
  selectedDestination: Destination | null
  hoveredDestination: Destination | null
  dates: {
    start: string
    end: string
  }
  travelers: string
  preferences: string[]
  voiceActive: boolean
  isSearching: boolean
  
  // Setters
  setStep: (step: WizardStep) => void
  setSearchQuery: (query: string) => void
  setSelectedDestination: (dest: Destination | null) => void
  setHoveredDestination: (dest: Destination | null) => void
  setDates: (dates: { start: string; end: string }) => void
  setTravelers: (travelers: string) => void
  setPreferences: (prefs: string[]) => void
  togglePreference: (pref: string) => void
  setVoiceActive: (active: boolean) => void
  setSearching: (searching: boolean) => void
  resetWizard: () => void
}
