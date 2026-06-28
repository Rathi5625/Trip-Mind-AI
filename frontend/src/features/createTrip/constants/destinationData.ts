import { Destination } from "../types/createTrip"

export const DESTINATIONS: Destination[] = [
  {
    id: "tokyo-luxury",
    name: "Tokyo Luxury Tour",
    country: "Japan",
    description: "Exclusive culinary & cultural experiences in high-end Ginza districts and historic temples.",
    matchScore: 99,
    category: "Culinary",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹1,85,000",
    bestSeason: "Spring (Cherry Blossoms)",
    popularity: 96,
    bestMonths: "March - May, Oct - Nov",
    confidence: 98,
    attractions: ["Ginza Shopping", "Senso-ji Temple", "Tsukiji Outer Market", "Shibuya Sky"],
    transport: "Shinkansen & Private Chauffeur",
    matchReasons: ["Luxury Hotels", "Culinary Experiences", "City Exploration", "Autumn Weather"],
    tempRange: "15°C - 22°C",
    flightDuration: "7.5 hours",
    tripDuration: "7 Days"
  },
  {
    id: "bali-retreat",
    name: "Bali Retreat",
    country: "Indonesia",
    description: "Private wellness sanctuarites overlooking Ubud valley and coastal Uluwatu beaches.",
    matchScore: 94,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹95,000",
    bestSeason: "Dry Season (Summer)",
    popularity: 92,
    bestMonths: "May - September",
    confidence: 95,
    attractions: ["Ubud Monkey Forest", "Tegallalang Rice Terraces", "Uluwatu Temple Cliff", "Seminyak Beach"],
    transport: "Scooter & Private Driver",
    matchReasons: ["Wellness & Spas", "Geothermal Pools", "Geographical Wonders", "Relaxed Pacing"],
    tempRange: "26°C - 31°C",
    flightDuration: "9 hours",
    tripDuration: "10 Days"
  },
  {
    id: "parisian-chic",
    name: "Parisian Chic",
    country: "France",
    description: "A romance-filled weekend checking out couture exhibits and fine dining along the Seine.",
    matchScore: 89,
    category: "Romance",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹2,10,000",
    bestSeason: "Late Spring / Autumn",
    popularity: 88,
    bestMonths: "April - June, Sept - Oct",
    confidence: 92,
    attractions: ["Eiffel Tower Lounge", "Louvre Museum", "Champs-Élysées", "Seine Cruise Dinner"],
    transport: "Paris Métro & Luxury Sedans",
    matchReasons: ["Fine Dining", "Historic Architecture", "Couture Exhibitions", "Romantic Cruises"],
    tempRange: "12°C - 19°C",
    flightDuration: "10 hours",
    tripDuration: "5 Days"
  },
  {
    id: "iceland-aurora",
    name: "Iceland Aurora Expedition",
    country: "Iceland",
    description: "Private guided tour through the Ring Road, glacier caves, and natural geothermal pools.",
    matchScore: 95,
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹2,45,000",
    bestSeason: "Winter (Northern Lights)",
    popularity: 90,
    bestMonths: "November - February",
    confidence: 97,
    attractions: ["Blue Lagoon", "Gullfoss Waterfall", "Vatnajökull Ice Caves", "Black Sand Beach"],
    transport: "Super Jeep 4x4 & Guided Bus",
    matchReasons: ["Glacier Hikes", "Aurora Viewing", "Active Volcano Safaris", "Geothermal Baths"],
    tempRange: "-2°C - 4°C",
    flightDuration: "13.5 hours",
    tripDuration: "8 Days"
  }
]

export const TRENDING_TAGS = [
  { label: "Amalfi Coast", emoji: "🌅", query: "Amalfi Coast luxury coast and culinary" },
  { label: "Bora Bora", emoji: "🏝️", query: "Bora Bora overwater bungalows beach" },
  { label: "Swiss Alps Ski Chalets", emoji: "🎿", query: "Swiss Alps skiing winter chalet luxury" }
]

export const ATLAS_TRENDS = {
  trendingMatch: {
    country: "Japan",
    reason: "highly recommended right now for its exceptional cherry blossom season and premium culinary tours."
  },
  luxuryHighlight: {
    destination: "Santorini",
    reason: "for exclusive private villa stays with sunset caldera views."
  }
}
