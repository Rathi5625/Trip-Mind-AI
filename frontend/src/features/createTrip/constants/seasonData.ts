import { DateEventBadge, SeasonStats } from "../types/travelDates"

export const DATE_EVENT_BADGES: DateEventBadge[] = [
  {
    dateStr: "2024-10-12",
    label: "Autumn Peak Starts",
    emoji: "🍁",
    type: "autumn"
  },
  {
    dateStr: "2024-10-23",
    label: "Best Weather",
    emoji: "☀️",
    type: "weather"
  },
  {
    dateStr: "2024-10-05",
    label: "Lowest Flight Prices",
    emoji: "✈️",
    type: "price"
  },
  {
    dateStr: "2024-10-19",
    label: "Festival Week",
    emoji: "🎌",
    type: "festival"
  }
]

export const TOKYO_SEASON_STATS: SeasonStats = {
  weatherTemp: "22°C / 14°C",
  weatherDesc: "Clear Skies",
  costIndex: "Mid-Range (Avg)",
  crowdLevel: "Moderate"
}
