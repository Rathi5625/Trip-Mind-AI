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

export interface MorningBriefItem {
  id: string
  text: string
  type: "price" | "weather" | "visa" | "hotel" | "restaurant"
}

export interface MorningBrief {
  greeting: string
  bullets: MorningBriefItem[]
}

export interface TimelineEvent {
  id: string
  timeLabel: string
  title: string
  description: string
  type: "alert" | "info" | "success" | "warning"
}

export interface TravelScoreChecklistItem {
  id: string
  text: string
  status: "success" | "warning" | "info"
}

export interface TravelScore {
  readiness: number
  checklist: TravelScoreChecklistItem[]
}

export interface MapData {
  visitedCountries: number
  plannedDestinations: number
  wishlistDestinations: number
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
  
  // Upgraded Feature Fields
  morningBrief: MorningBrief
  timeline: TimelineEvent[]
  travelScore: TravelScore
  map: MapData
}
