export interface GeneratedTripInfo {
  destinationName: string
  subtitle: string
  description: string
  duration: string
  imageUrl: string
  totalBudget: number
  flightsPercentage: number
  staysPercentage: number
  savedLocationsCount: number
  weatherAlert: string
  diningSuggestion: string
  
  // New analytical/personalized summary values
  placesCount: number
  restaurantsCount: number
  hotelsComparedCount: number
  transportRoutesCount: number
  savedAmount: number
  matchScore: number
  personalizedMessage: string
}

export interface GeneratedTripState {
  selectedTrip: GeneratedTripInfo | null
  setSelectedTrip: (trip: GeneratedTripInfo | null) => void
  resetGeneratedTripStore: () => void
}
