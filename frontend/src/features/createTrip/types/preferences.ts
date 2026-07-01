export interface Interest {
  id: string
  label: string
  subtitle: string
  icon: string
}

export interface Accommodation {
  id: string
  type: string
  description: string
  priceIndicator: string
  imageUrl: string
}

export interface Pace {
  id: string
  label: string
  description: string
}

export interface PreferencesState {
  selectedInterests: string[]
  selectedAccommodation: string | null
  travelPace: string

  toggleInterest: (id: string) => void
  setSelectedInterests: (interests: string[]) => void
  setSelectedAccommodation: (id: string | null) => void
  setTravelPace: (pace: string) => void
  resetPreferencesStore: () => void
}
