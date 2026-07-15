export interface WorkspaceOverview {
  tripId: string
  title: string
  destinationName: string
  startDate: string
  endDate: string
  budgetCategory: string
  travelersCount: number
  pace: string
  progress: {
    percent: number
    tasksRemaining: string[]
  }
  stats: {
    countdownDays: number
    aiScore: number
    spentBudget: number
    totalBudget: number
    statusBadge: string
  }
  weather: {
    temperature: number
    currency: string
    timezone: string
    safetyRating: number
  }
  insights: Array<{
    type: string
    title: string
    description: string
    icon: string
  }>
}

export interface Activity {
  id: number
  time: string
  name: string
  description: string
  imageUrl: string
  category: string
  duration: string
  budget: number
  address: string
  rating: number
}

export interface ItineraryDay {
  id: number
  dayNumber: number
  date: string
  description: string
  activities: Activity[]
}

export interface Booking {
  id: string
  resourceType: string
  resourceName: string
  referenceNumber: string
  price: number
  status: string
  details: string
  startTime: string
  endTime: string
}

export interface AnalyticsData {
  tripId: string
  totalSpent: number
  categoryBreakdown: Record<string, number>
  expenses: Array<{
    id: number
    title: string
    amount: number
    category: string
    date: string
  }>
}

export interface ForecastData {
  id: number
  forecastText: string
  category: string
}

export interface ProgressData {
  id: number
  progressPercent: number
  tasksRemaining: string
}
