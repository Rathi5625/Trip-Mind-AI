import { SearchDestination, GemDestination, ComparisonCity } from "../types/search"

export const getSearchDestinations = async (
  query: string
): Promise<SearchDestination[]> => {
  await new Promise((resolve) => setTimeout(resolve, 150))
  
  // Return items matching screenshot exactly, with hover preview stats
  return [
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
      matchScore: 98,
      description: "Ultra-modern cityscape blending neon lit skyscrapers with historical temples.",
      budgetPerPerson: 120000,
      duration: "1 Week",
      weatherText: "Clear",
      weatherTemp: "18°C",
      weatherIcon: "sunny",
      restaurantsCount: 18,
      attractionsCount: 14,
      hotelsCount: 5
    },
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      matchScore: 95,
      description: "Classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
      budgetPerPerson: 105000,
      duration: "1 Week",
      weatherText: "Clear",
      weatherTemp: "22°C",
      weatherIcon: "sunny",
      restaurantsCount: 14,
      attractionsCount: 12,
      hotelsCount: 4
    },
    {
      id: "osaka",
      name: "Osaka",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1590250767355-6b5839b2cd81?auto=format&fit=crop&w=800&q=80",
      matchScore: 88,
      description: "Known for its modern architecture, nightlife and hearty street food spots.",
      budgetPerPerson: 95000,
      duration: "3-5 Days",
      weatherText: "Cloudy",
      weatherTemp: "15°C",
      weatherIcon: "cloudy",
      restaurantsCount: 22,
      attractionsCount: 8,
      hotelsCount: 3
    }
  ]
}

export const getHiddenGems = async (): Promise<GemDestination[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    {
      id: "kanazawa",
      name: "Kanazawa",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
      description: "Often called 'Little Kyoto', known for well-preserved Edo-era districts and historic geisha tea houses.",
      discoveryScore: 94,
      cost: 75000,
      duration: "3-5 Days"
    },
    {
      id: "nikko",
      name: "Nikko",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      description: "Mountainous region featuring lavishly decorated shrines and beautiful autumn colors.",
      discoveryScore: 91,
      cost: 62000,
      duration: "2 Days"
    },
    {
      id: "shirakawa",
      name: "Shirakawa-go",
      country: "Japan",
      imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      description: "Famous for its traditional gassho-zukuri farmhouses, especially picturesque in winter.",
      discoveryScore: 89,
      cost: 58000,
      duration: "1 Day"
    }
  ]
}

export const getComparisonData = async (): Promise<ComparisonCity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 80))
  return [
    {
      name: "Tokyo",
      budget: "Higher (₹120k)",
      budgetScore: 60,
      weather: "18°C, Clear",
      weatherScore: 78,
      popularity: "Very High",
      popularityScore: 95,
      food: "Exceptional",
      foodScore: 98,
      safety: "Outstanding",
      safetyScore: 96,
      nightlife: "Excellent",
      nightlifeScore: 92,
      crowds: "Dense",
      crowdsScore: 88,
      bestSeason: "Spring / Autumn",
      isBudgetBetter: false,
      isWeatherBetter: true,
      isPopularityBetter: true
    },
    {
      name: "Seoul",
      budget: "Lower (₹85k)",
      budgetScore: 85,
      weather: "15°C, Cloudy",
      weatherScore: 68,
      popularity: "High",
      popularityScore: 82,
      food: "Amazing",
      foodScore: 90,
      safety: "Excellent",
      safetyScore: 92,
      nightlife: "Vibrant",
      nightlifeScore: 88,
      crowds: "Moderate",
      crowdsScore: 60,
      bestSeason: "Autumn",
      isBudgetBetter: true,
      isWeatherBetter: false,
      isPopularityBetter: false
    }
  ]
}
