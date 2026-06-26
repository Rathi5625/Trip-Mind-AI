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

export interface DestinationInfo {
  name: string
  image: string
  temp: string
  weather: string
  crowdLevel: string
  budget: BudgetBreakdown
}

export interface PlannerData {
  suggestions: PromptSuggestion[]
  templates: TripTemplate[]
  savedTrips: SavedTrip[]
  initialDestination: DestinationInfo
}
