export interface Traveler {
  name: string
  avatarUrl?: string
  initials: string
}

export interface Trip {
  id: string
  destination: string
  startDate: string
  endDate: string
  status: string
  statusType: "success" | "warning" | "danger" | "info"
  daysToGo?: number
  image?: string
  travelers: Traveler[]
  quickActionText?: string
}

export interface AIInsight {
  id: string
  type: "price" | "weather" | "general"
  badgeText: string
  badgeType: "price-drop" | "optimal-time" | "info"
  content: string
  actionText: string
  actionLink: string
  icon: string
}

export interface BudgetBreakdownItem {
  category: string
  amount: number
  color: string
}

export interface BudgetData {
  spent: number
  totalBudget: number
  breakdown: BudgetBreakdownItem[]
}

export interface Recommendation {
  id: string
  destination: string
  country: string
  matchScore: number
  description: string
  image: string
  bestSeason?: string
  avgBudget?: string
  rating?: number
}

export interface Statistic {
  id: string
  label: string
  value: number
  icon: string
  description?: string
}

export interface DashboardData {
  travelerName: string
  membershipType: string
  upcomingTrip: {
    destination: string
    daysToGo: number
    durationDays: number
    id: string
  } | null
  insights: AIInsight[]
  budget: BudgetData
  trips: Trip[]
  recommendations: Recommendation[]
  stats: Statistic[]
}
