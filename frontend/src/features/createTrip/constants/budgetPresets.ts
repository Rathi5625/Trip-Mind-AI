import { BudgetPreset, CurrencyType } from "../types/budget"

export const BUDGET_PRESETS: BudgetPreset[] = [
  {
    id: "budget",
    label: "Budget",
    description: "Hostels, street food, public transit.",
    rangeText: "< $1,500",
    minSpend: 500,
    maxSpend: 1500,
    defaultSpend: 1000,
    iconName: "piggy",
    hoverDetails: {
      accommodation: "Shared dormitory rooms, capsule hotels, or budget guesthouses.",
      dining: "Local convenience store snacks, ramen stands, and casual street food.",
      activities: "Free shrines, walking city tours, and cheap public train transits."
    }
  },
  {
    id: "comfort",
    label: "Comfort",
    description: "3-4 star hotels, nice restaurants, taxis.",
    rangeText: "$1,500 - $3,000",
    minSpend: 1500,
    maxSpend: 3000,
    defaultSpend: 3000,
    iconName: "bed",
    hoverDetails: {
      accommodation: "Private rooms in 3-4 star chain hotels (e.g., APA, Tokyu Stay).",
      dining: "Casual table-service Izakayas, sushi conveyers, and mid-range dining.",
      activities: "TeamLab museum tickets, Shibuya Sky entry, and taxi trips."
    }
  },
  {
    id: "premium",
    label: "Premium",
    description: "Boutique hotels, fine dining, private tours.",
    rangeText: "$3,000 - $6,000",
    minSpend: 3000,
    maxSpend: 6000,
    defaultSpend: 4500,
    iconName: "gem",
    hoverDetails: {
      accommodation: "Premium design boutique stays or spacious Western business hotels.",
      dining: "Multi-course Kaiseki experiences, Wagyu beef grills, and cocktail lounges.",
      activities: "Day trips to Mt. Fuji with private guides and Shinkansen tickets."
    }
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "5-star resorts, Michelin stars, chauffeur.",
    rangeText: "$6,000+",
    minSpend: 6000,
    maxSpend: 10000,
    defaultSpend: 8000,
    iconName: "star",
    hoverDetails: {
      accommodation: "5-star luxury hotels (Aman Tokyo, Ritz Carlton, luxury Ryokans).",
      dining: "Michelin-starred sushi counters and high-end private dining rooms.",
      activities: "Helicopter rides, private airport transfers, and personal tour concierge."
    }
  }
]

export interface BudgetTip {
  text: string
  amountInUSD: number
}

export const BUDGET_TIPS: BudgetTip[] = [
  { text: "Fly on Tuesday instead of weekend departures", amountInUSD: 180 },
  { text: "Stay in Shinjuku boutique stays instead of luxury Ginza hubs", amountInUSD: 240 },
  { text: "Purchase a JR Pass beforehand to reduce transit fees", amountInUSD: 95 }
]

export interface BookingTimelinePoint {
  label: string // e.g. "Now", "In 1 Month"
  monthsAhead: number
  priceIndex: number // base price multiplier
}

export const BOOKING_TIMELINE_DATA: BookingTimelinePoint[] = [
  { label: "3 Months Ahead (Best)", monthsAhead: 3, priceIndex: 0.88 },
  { label: "2 Months Ahead", monthsAhead: 2, priceIndex: 0.95 },
  { label: "1 Month Ahead", monthsAhead: 1, priceIndex: 1.05 },
  { label: "Now", monthsAhead: 0, priceIndex: 1.0 },
  { label: "Next Week", monthsAhead: -0.25, priceIndex: 1.25 },
  { label: "Departure Day (Peak)", monthsAhead: -0.5, priceIndex: 1.48 }
]


export const ALLOCATION_PERCENTAGES = {
  flights: 0.28333,      // $850 of $3000 = ~28.33%
  accommodation: 0.40,   // $1200 of $3000 = 40%
  dining: 0.15,          // $450 of $3000 = 15%
  activities: 0.16667    // $500 of $3000 = ~16.67%
}

export interface CurrencyConfig {
  rate: number
  symbol: string
  label: string
}

export const CURRENCY_CONFIGS: Record<CurrencyType, CurrencyConfig> = {
  USD: { rate: 1.0, symbol: "$", label: "USD" },
  EUR: { rate: 0.92, symbol: "€", label: "EUR" },
  JPY: { rate: 160.0, symbol: "¥", label: "JPY" }
}
