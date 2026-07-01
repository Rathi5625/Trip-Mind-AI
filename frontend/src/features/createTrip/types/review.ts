export interface AIWeatherForecast {
  month: string
  temp: string
  condition: string
  rainStatus: string
  season: string
}

export interface AIOutlook {
  matchScore: number
  matchDescription: string
  weatherForecast: AIWeatherForecast
  crowds: string
  readiness: number
  confidence: number
  warnings: string[]
  estimatedTimeSeconds: number
}

export interface BudgetSlice {
  category: string
  amount: number
  percentage: number
  color: string
}

export interface TripReviewData {
  destination: string
  country: string
  region: string
  imageUrl: string
  dates: string
  duration: string
  travelersCount: string
  travelersType: string
  accommodation: string
  pace: string
  budgetTotal: number
  budgetBreakdown: BudgetSlice[]
  interests: string[]
}

export interface ReviewState {
  isGenerating: boolean
  progress: number
  error: string | null
  setGenerating: (isGenerating: boolean) => void
  setProgress: (progress: number) => void
  setError: (error: string | null) => void
  resetReviewStore: () => void
}
