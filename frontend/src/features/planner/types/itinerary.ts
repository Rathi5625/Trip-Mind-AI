export interface Activity {
  id: string
  time: string
  category: "Activity" | "Dining" | "Transit" | "Hotel"
  title: string
  description: string
  cost: number
  coordinates: { x: number; y: number }
}

export interface DayPlan {
  id: string
  dayNumber: number
  title: string
  activities: Activity[]
}

export interface ItineraryDetails {
  title: string
  duration: string
  dates: string
  image: string
  summary: string
  days: DayPlan[]
}

export interface IntelligenceMetrics {
  readiness: number
  visaStatus: string
  priceAlert: string
  temp: string
  weatherStatus: string
  crowdLevel: string
  crowdStatus: string
}

export interface ItineraryBudget {
  total: number
  flights: number
  hotel: number
  hotelDetails: string
  daily: number
}
