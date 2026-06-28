import { DateEventBadge, SeasonStats } from "../types/travelDates"

export const DATE_EVENT_BADGES: DateEventBadge[] = [
  {
    dateStr: "2024-10-12",
    label: "Autumn Peak Starts",
    emoji: "🍁",
    type: "autumn",
    description: "The official start of Tokyo's peak maple leaves transformations. Parks like Shinjuku Gyoen and Rikugien turn into golden-crimson landscapes.",
    whyVisit: "Witness the iconic autumn foliage, perfect for landscape photography and traditional garden teahouse strolls."
  },
  {
    dateStr: "2024-10-23",
    label: "Best Weather",
    emoji: "☀️",
    type: "weather",
    description: "Mild, crisp autumn afternoons with clear blue skies, minimal precipitation, and comfortable walking temperatures around 20°C.",
    whyVisit: "Optimal conditions for temple exploration, outdoor food markets, and open-air skyscraper observatories without heat or rain."
  },
  {
    dateStr: "2024-10-05",
    label: "Lowest Flight Prices",
    emoji: "✈️",
    type: "price",
    description: "Early-month travel period offering direct flight fare discounts from major hubs, averaging 14% lower than standard season values.",
    whyVisit: "Saves a significant amount on airfare costs, leaving more of your travel budget for premium accommodation or Michelin-starred dining."
  },
  {
    dateStr: "2024-10-19",
    label: "Festival Week",
    emoji: "🎌",
    type: "festival",
    description: "Tokyo's traditional autumn micro-festivals featuring local shrine processions, street food vendors, and traditional dance performances.",
    whyVisit: "Immerse yourself in authentic Edo-period heritage and try traditional festival treats like takoyaki and yakitori."
  }
]

export const TOKYO_SEASON_STATS: SeasonStats = {
  weatherTemp: "22°C / 14°C",
  weatherDesc: "Clear Skies",
  costIndex: "Mid-Range (Avg)",
  crowdLevel: "Moderate"
}

// Color coding airfare classes: cheapest, average, expensive
export const AIRFARE_HEATMAP: Record<number, "cheapest" | "average" | "expensive"> = {
  1: "cheapest", 2: "cheapest", 3: "cheapest", 4: "cheapest", 5: "cheapest", 6: "cheapest", 7: "cheapest", 8: "cheapest", 9: "cheapest",
  10: "average", 11: "average",
  12: "expensive", 13: "expensive", 14: "expensive", 15: "expensive", 16: "expensive", 17: "expensive", 18: "expensive", 19: "expensive", 20: "expensive", 21: "expensive", 22: "expensive",
  23: "average", 24: "average", 25: "average", 26: "average", 27: "average", 28: "average", 29: "average", 30: "average", 31: "average"
}

export interface TimelineDataPoint {
  dateLabel: string
  cost: number
  category: "cheapest" | "average" | "expensive"
  dayNumber: number
}

export const TOKYO_COST_TIMELINE: TimelineDataPoint[] = [
  { dateLabel: "Oct 1", cost: 110000, category: "cheapest", dayNumber: 1 },
  { dateLabel: "Oct 5", cost: 95000, category: "cheapest", dayNumber: 5 },
  { dateLabel: "Oct 10", cost: 135000, category: "average", dayNumber: 10 },
  { dateLabel: "Oct 12", cost: 185000, category: "expensive", dayNumber: 12 },
  { dateLabel: "Oct 15", cost: 172050, category: "expensive", dayNumber: 15 },
  { dateLabel: "Oct 19", cost: 180000, category: "expensive", dayNumber: 19 },
  { dateLabel: "Oct 23", cost: 145000, category: "average", dayNumber: 23 },
  { dateLabel: "Oct 26", cost: 130000, category: "average", dayNumber: 26 },
  { dateLabel: "Oct 29", cost: 125000, category: "average", dayNumber: 29 }
]

