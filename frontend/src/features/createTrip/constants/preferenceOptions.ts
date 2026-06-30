import { Interest, Accommodation, Pace } from "../types/preferences"

export const INTEREST_OPTIONS: Interest[] = [
  { id: "culinary", label: "Culinary", subtitle: "Local food & dining", icon: "Utensils" },
  { id: "nature", label: "Nature", subtitle: "Outdoors & scenery", icon: "Palmtree" },
  { id: "culture", label: "Culture", subtitle: "History & arts", icon: "Landmark" },
  { id: "shopping", label: "Shopping", subtitle: "Retail & markets", icon: "ShoppingBag" },
  { id: "nightlife", label: "Nightlife", subtitle: "Clubs & evening life", icon: "Beer" },
  { id: "adventure", label: "Adventure", subtitle: "Thrills & activities", icon: "Compass" },
  { id: "luxury", label: "Luxury", subtitle: "High-end comfort", icon: "Gem" },
  { id: "wellness", label: "Wellness", subtitle: "Spa & relaxation", icon: "Heart" },
  { id: "history", label: "History", subtitle: "Ancient sites & heritage", icon: "History" },
  { id: "photography", label: "Photography", subtitle: "Scenic photo spots", icon: "Camera" },
  { id: "architecture", label: "Architecture", subtitle: "Iconic structure design", icon: "Home" },
  { id: "museums", label: "Museums", subtitle: "Art galleries & exhibits", icon: "Columns" }
]

export const ACCOMMODATION_OPTIONS: Accommodation[] = [
  {
    id: "budget",
    type: "Budget",
    description: "Hostels & simple stays",
    priceIndicator: "$",
    imageUrl: "/images/rome_street.png"
  },
  {
    id: "boutique",
    type: "Boutique",
    description: "Unique & stylish",
    priceIndicator: "$$",
    imageUrl: "/images/india_luxury_hotel.png"
  },
  {
    id: "luxury",
    type: "Luxury",
    description: "Premium 5-star experience",
    priceIndicator: "$$$",
    imageUrl: "/images/tokyo.png"
  }
]

export const PACE_OPTIONS: Pace[] = [
  { id: "relaxed", label: "Relaxed", description: "Slow travel, plenty of breaks, late mornings." },
  { id: "balanced", label: "Balanced", description: "Steady exploration, mixed sightseeing and rest." },
  { id: "fast", label: "Fast-Paced", description: "Full schedule, maximize sights, early departures." }
]
