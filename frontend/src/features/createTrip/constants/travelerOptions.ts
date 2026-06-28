import { GroupType } from "../types/travelers"

export interface GroupConfig {
  id: GroupType
  label: string
  description: string
  iconName: "user" | "heart" | "users" | "baby" | "briefcase"
}

export const GROUP_TYPES: GroupConfig[] = [
  { id: "solo", label: "Solo", description: "Just me, myself, & I", iconName: "user" },
  { id: "couple", label: "Couple", description: "Romantic getaway", iconName: "heart" },
  { id: "friends", label: "Friends", description: "Group of pals", iconName: "users" },
  { id: "family", label: "Family", description: "Kids in tow", iconName: "baby" },
  { id: "business", label: "Business", description: "Work trip", iconName: "briefcase" },
  { id: "group", label: "Large Group", description: "10+ people", iconName: "users" }
]

export const SPECIAL_REQUIREMENTS = [
  "Wheelchair Accessible",
  "Vegetarian / Vegan",
  "Pet Friendly",
  "Kid Friendly",
  "Hearing Assistance",
  "Gluten Free",
  "Halal Food",
  "Kosher Meals",
  "Low Walking",
  "Luxury Only"
]

export interface CompatibilityStat {
  score: number
  points: string[]
  warnings: string[]
}

export const TOKYO_COMPATIBILITY: Record<GroupType, CompatibilityStat> = {
  solo: {
    score: 94,
    points: ["Safe neighborhoods", "Excellent solo dining culture (e.g. Ichiran)", "Convenient capsule hotels"],
    warnings: ["Language barriers in local alleyway bars"]
  },
  couple: {
    score: 96,
    points: ["Romantic sunset skydecks", "World-class Michelin fine dining", "Traditional Ryokans with private Onsen"],
    warnings: ["Requires advanced booking for couple retreats"]
  },
  friends: {
    score: 90,
    points: ["Vibrant nightlife in Roppongi & Shibuya", "Anime theme cafes in Akihabara", "Exciting karaoke bars"],
    warnings: ["Small dining tables fit groups of 2-4 best"]
  },
  family: {
    score: 95,
    points: ["Kid-friendly parks (Ueno, Yoyogi)", "Disney Resort Tokyo nearby", "Extremely clean trains and restrooms"],
    warnings: ["Rush hour commutes are congested with strollers"]
  },
  business: {
    score: 85,
    points: ["Superfast public fiber connection hubs", "Top business hotels in Shinjuku", "Abundant quiet coworking cafes"],
    warnings: ["Commutes can be tiring during work hours"]
  },
  group: {
    score: 78,
    points: ["Private charter buses available", "Spacious villa rentals in suburbs", "Large Izakaya party tables"],
    warnings: ["Extremely crowded with large groups in narrow alleys"]
  }
}

export const SMART_RECOMMENDATIONS: Record<GroupType, string[]> = {
  solo: ["Walking tours", "Hostels", "Social experiences"],
  couple: ["Fine dining", "Romantic hotels", "Sunset cruises"],
  friends: ["Nightlife", "Adventure activities", "Group accommodations"],
  family: ["Kid-friendly attractions", "Parks", "Museums"],
  business: ["Business hotels", "Airport transfers", "Coworking spaces"],
  group: ["Villas", "Private buses", "Group dining"]
}

export const GROUP_SUMMARY_RECOMMENDATIONS: Record<GroupType, string[]> = {
  solo: [
    "Solo/Hostel Lodging",
    "Flexible City Explorer Pace",
    "Public Transit Pass",
    "Individual Activities"
  ],
  couple: [
    "Boutique Ryokan Stays",
    "Intimate Fine Dining",
    "Private Cab Transfers",
    "Romantic Sunset Viewings"
  ],
  friends: [
    "Multi-bed Suites",
    "Nightlife & Izakaya Hubs",
    "Shared Group Transit",
    "Group Adventure Experiences"
  ],
  family: [
    "Family Suites",
    "Child-friendly Attractions",
    "Private Transfers",
    "Relaxed Daily Schedule"
  ],
  business: [
    "Premium Business Rooms",
    "Coworking Hot Spots",
    "Chauffeur Airport Pickups",
    "Efficient Productivity Schedule"
  ],
  group: [
    "Entire Private Villas",
    "Group Party Dining Reservations",
    "Private Charter Bus Transport",
    "Pre-coordinated Itineraries"
  ]
}

