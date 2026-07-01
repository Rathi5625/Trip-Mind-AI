import { Category } from "../types/discover"

export const SEARCH_SUGGESTION_CHIPS = [
  "Weekend Getaways",
  "Culinary Tours",
  "Wellness Retreats",
  "Adventure Escapes",
  "Luxury Resorts",
  "Family Trips",
  "Honeymoon",
  "Road Trips"
]

export const DISCOVER_CATEGORIES: Category[] = [
  { id: "beaches", label: "Beaches", emoji: "🏖️", destinationCount: 142 },
  { id: "mountains", label: "Mountains", emoji: "🏔️", destinationCount: 98 },
  { id: "cities", label: "Cities", emoji: "🌆", destinationCount: 210 },
  { id: "nature", label: "Nature", emoji: "🌲", destinationCount: 115 },
  { id: "culture", label: "Culture", emoji: "🏛️", destinationCount: 88 },
  { id: "luxury", label: "Luxury", emoji: "💎", destinationCount: 64 },
  { id: "food", label: "Food", emoji: "🍜", destinationCount: 120 },
  { id: "adventure", label: "Adventure", emoji: "🧗", destinationCount: 76 },
  { id: "roadtrips", label: "Road Trips", emoji: "🚗", destinationCount: 52 },
  { id: "wellness", label: "Wellness", emoji: "🧘", destinationCount: 43 }
]
