import { apiClient } from "@/services/apiClient";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { SearchDestination, GemDestination, ComparisonCity } from "../types/search";

const getDestinationImage = async (name: string): Promise<string> => {
  try {
    const data = await apiClient.get<{ imageUrl?: string }>(API_ENDPOINTS.AI.IMAGE(name));
    if (data?.imageUrl) return data.imageUrl;
  } catch (_) {}
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80";
};

export const getSearchDestinations = async (query: string): Promise<SearchDestination[]> => {
  try {
    const data = await apiClient.get<SearchDestination[]>(API_ENDPOINTS.DESTINATIONS.SEARCH(query));
    if (Array.isArray(data) && data.length > 0) {
      return await Promise.all(data.map(async (d: SearchDestination) => ({
        ...d,
        imageUrl: d.imageUrl || await getDestinationImage(`${d.name} ${d.country}`),
        weatherText: d.weatherText || "Clear",
        weatherTemp: d.weatherTemp || "--",
        weatherIcon: d.weatherIcon || "sunny",
        restaurantsCount: d.restaurantsCount || 0,
        attractionsCount: d.attractionsCount || 0,
        hotelsCount: d.hotelsCount || 0,
      })));
    }
  } catch (e) {
    console.warn("[search] Backend unavailable:", e);
  }

  const defaults = [
    { id: query.toLowerCase().replace(/\s+/g, "-") || "search", name: query || "Explore", country: "World", matchScore: 90, description: "Discover the world with AI-powered travel planning.", budgetPerPerson: 100000, duration: "1 Week", weatherText: "Sunny", weatherTemp: "22C", weatherIcon: "sunny", restaurantsCount: 10, attractionsCount: 8, hotelsCount: 4 },
  ];
  return await Promise.all(defaults.map(async (d) => ({ ...d, imageUrl: await getDestinationImage(`${d.name} travel`) })));
};

export const getHiddenGems = async (): Promise<GemDestination[]> => {
  try {
    const data = await apiClient.get<GemDestination[]>(API_ENDPOINTS.DESTINATIONS.HIDDEN_GEMS);
    if (Array.isArray(data) && data.length > 0) {
      return await Promise.all(data.map(async (d: GemDestination) => ({ ...d, imageUrl: d.imageUrl || await getDestinationImage(`${d.name} ${d.country}`) })));
    }
  } catch (e) {
    console.warn("[search] Backend unavailable:", e);
  }
  const list = [
    { id: "kanazawa", name: "Kanazawa", country: "Japan", description: "Often called Little Kyoto, known for preserved Edo-era districts and geisha houses.", discoveryScore: 94, cost: 75000, duration: "3-5 Days" },
    { id: "nikko", name: "Nikko", country: "Japan", description: "Mountainous region featuring lavishly decorated shrines and beautiful autumn colors.", discoveryScore: 91, cost: 62000, duration: "2 Days" },
    { id: "shirakawa", name: "Shirakawa-go", country: "Japan", description: "Famous for gassho-zukuri farmhouses, especially picturesque in winter.", discoveryScore: 89, cost: 58000, duration: "1 Day" },
  ];
  return await Promise.all(list.map(async (d) => ({ ...d, imageUrl: await getDestinationImage(`${d.name} ${d.country}`) })));
};

export const getComparisonData = async (): Promise<ComparisonCity[]> => {
  return [
    { name: "Tokyo", budget: "Higher", budgetScore: 60, weather: "18C, Clear", weatherScore: 78, popularity: "Very High", popularityScore: 95, food: "Exceptional", foodScore: 98, safety: "Outstanding", safetyScore: 96, nightlife: "Excellent", nightlifeScore: 92, crowds: "Dense", crowdsScore: 88, bestSeason: "Spring / Autumn", isBudgetBetter: false, isWeatherBetter: true, isPopularityBetter: true },
    { name: "Seoul", budget: "Lower", budgetScore: 85, weather: "15C, Cloudy", weatherScore: 68, popularity: "High", popularityScore: 82, food: "Amazing", foodScore: 90, safety: "Excellent", safetyScore: 92, nightlife: "Vibrant", nightlifeScore: 88, crowds: "Moderate", crowdsScore: 60, bestSeason: "Autumn", isBudgetBetter: true, isWeatherBetter: false, isPopularityBetter: false },
  ];
};
