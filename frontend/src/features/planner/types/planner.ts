export interface PromptSuggestion {
  id: string
  icon: string
  title: string
  description: string
  promptText: string
}

export interface TripTemplate {
  id: string
  label: string
  icon: string
}

export interface SavedTrip {
  id: string
  title: string
  date: string
}

export interface AIMessageItem {
  id: string
  sender: "user" | "ai"
  text: string
  timestamp: Date
  status?: "typing" | "done"
}

export interface BudgetBreakdown {
  flights: number
  hotels: number
  daily: number
  total: number
}

export interface BudgetSavings {
  estimated: number
  savings: number
  cheaperFlights: boolean
  betterHotels: boolean
  restaurantDeals: boolean
}

export interface AITravelScoreDetail {
  score: number
  weather: number
  budget: number
  safety: number
  crowdLevel: number
  recommendation: string
}

export interface MapMarker {
  label: string
  x: number
  y: number
  type: "attraction" | "hotel" | "start"
}

export interface MapRoute {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DestinationInfo {
  name: string
  image: string
  temp: string
  weather: string
  crowdLevel: string
  budget: BudgetBreakdown
  
  // Upgraded fields
  savings: BudgetSavings
  travelScore: AITravelScoreDetail
  markers: MapMarker[]
  routes: MapRoute[]
}

export interface PlannerData {
  suggestions: PromptSuggestion[]
  templates: TripTemplate[]
  savedTrips: SavedTrip[]
  initialDestination: DestinationInfo
}
