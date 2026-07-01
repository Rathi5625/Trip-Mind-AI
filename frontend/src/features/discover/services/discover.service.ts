import { Destination, HiddenGem, TrendingItem } from "../types/discover"

export const getRecommendedDestinations = async (): Promise<Destination[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
      matchScore: 97,
      description: "A neon-lit synthesis of futuristic skyscrapers and serene centuries-old temples.",
      budget: 1800,
      bestSeason: "Spring / Autumn"
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      matchScore: 92,
      description: "Pristine beaches, terraced rice paddies, wellness ashrams, and active volcanos.",
      budget: 950,
      bestSeason: "April - September"
    },
    {
      id: "amalfi",
      name: "Amalfi Coast",
      country: "Italy",
      imageUrl: "https://images.unsplash.com/photo-1563841930606-67e2b64a897e?auto=format&fit=crop&w=800&q=80",
      matchScore: 89,
      description: "Clifftop pastel villages overlooking the cobalt Tyrrhenian Sea and lemon groves.",
      budget: 2200,
      bestSeason: "May - October"
    },
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      matchScore: 87,
      description: "Traditional wooden houses, imperial gardens, and legendary bamboo forests.",
      budget: 1600,
      bestSeason: "Cherry Blossom season"
    }
  ]
}

export const getHiddenGems = async (): Promise<HiddenGem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    {
      id: "faroe",
      name: "Faroe Islands",
      country: "Denmark",
      imageUrl: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      description: "Dramatic green basalt cliffs, sweeping waterfalls, and tiny puffin-populated villages.",
      discoveryScore: 98,
      cost: 1650,
      duration: "6 Days"
    },
    {
      id: "parisnight",
      name: "Paris at Night",
      country: "France",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      description: "Explore secret backstreets, candle-lit wine bars, and illuminated bridges without the day crowds.",
      discoveryScore: 94,
      cost: 1200,
      duration: "3 Days"
    },
    {
      id: "cappadocia",
      name: "Cappadocia Caves",
      country: "Turkey",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      description: "Stunning geological formations, cave stays, and hot air balloon panoramic flights.",
      discoveryScore: 91,
      cost: 850,
      duration: "4 Days"
    }
  ]
}

export const getTrendingThisMonth = async (): Promise<TrendingItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    {
      id: "lisbon",
      name: "Lisbon",
      country: "Portugal",
      imageUrl: "https://images.unsplash.com/photo-1509840144374-4c69d3873691?auto=format&fit=crop&w=800&q=80",
      popularityScore: 98,
      growthPercentage: 24,
      avgTemp: "22°C",
      bestMonth: "September"
    },
    {
      id: "capetown",
      name: "Cape Town",
      country: "South Africa",
      imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      popularityScore: 95,
      growthPercentage: 18,
      avgTemp: "25°C",
      bestMonth: "November"
    },
    {
      id: "oahu",
      name: "Oahu",
      country: "Hawaii",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      popularityScore: 91,
      growthPercentage: 12,
      avgTemp: "28°C",
      bestMonth: "May"
    }
  ]
}
