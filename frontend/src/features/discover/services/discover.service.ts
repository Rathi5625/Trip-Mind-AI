import { apiClient } from "@/services/apiClient";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { Destination, HiddenGem, TrendingItem } from "../types/discover";

const getDestinationImage = async (name: string): Promise<string> => {
  try {
    const data = await apiClient.get<{ imageUrl?: string }>(API_ENDPOINTS.AI.IMAGE(name));
    if (data?.imageUrl) return data.imageUrl;
  } catch (_) {}
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80";
};

export const getRecommendedDestinations = async (): Promise<Destination[]> => {
  try {
    const data = await apiClient.get<Destination[]>(API_ENDPOINTS.DESTINATIONS.RECOMMENDED);
    if (Array.isArray(data) && data.length > 0) {
      return await Promise.all(data.map(async (d: Destination) => ({ ...d, imageUrl: d.imageUrl || await getDestinationImage(`${d.name} ${d.country}`) })));
    }
  } catch (e) {
    console.warn("[discover] Backend unavailable:", e);
  }
  const list = [
    { id: "tokyo", name: "Tokyo", country: "Japan", matchScore: 97, description: "A neon-lit synthesis of futuristic skyscrapers and centuries-old temples.", budget: 1800, bestSeason: "Spring / Autumn" },
    { id: "bali", name: "Bali", country: "Indonesia", matchScore: 92, description: "Pristine beaches, rice paddies, wellness ashrams, and active volcanos.", budget: 950, bestSeason: "April - September" },
    { id: "paris", name: "Paris", country: "France", matchScore: 89, description: "Iconic boulevards, world-class art, and legendary gastronomy.", budget: 2200, bestSeason: "May - October" },
    { id: "kyoto", name: "Kyoto", country: "Japan", matchScore: 87, description: "Traditional wooden houses, imperial gardens, and bamboo forests.", budget: 1600, bestSeason: "Cherry Blossom season" },
  ];
  return await Promise.all(list.map(async (d) => ({ ...d, imageUrl: await getDestinationImage(`${d.name} ${d.country}`) })));
};

export const getHiddenGems = async (): Promise<HiddenGem[]> => {
  try {
    const data = await apiClient.get<HiddenGem[]>(API_ENDPOINTS.DESTINATIONS.HIDDEN_GEMS);
    if (Array.isArray(data) && data.length > 0) {
      return await Promise.all(data.map(async (d: HiddenGem) => ({ ...d, imageUrl: d.imageUrl || await getDestinationImage(`${d.name} ${d.country}`) })));
    }
  } catch (e) {
    console.warn("[discover] Backend unavailable:", e);
  }
  const list = [
    { id: "faroe", name: "Faroe Islands", country: "Denmark", description: "Dramatic basalt cliffs, sweeping waterfalls, and puffin-populated villages.", discoveryScore: 98, cost: 1650, duration: "6 Days" },
    { id: "cappadocia", name: "Cappadocia", country: "Turkey", description: "Geological formations, cave hotels, and hot air balloon panoramic flights.", discoveryScore: 94, cost: 850, duration: "4 Days" },
    { id: "azores", name: "Azores", country: "Portugal", description: "Volcanic islands with crater lakes, thermal spas, and whale watching.", discoveryScore: 91, cost: 1100, duration: "5 Days" },
  ];
  return await Promise.all(list.map(async (d) => ({ ...d, imageUrl: await getDestinationImage(`${d.name} ${d.country}`) })));
};

export const getTrendingThisMonth = async (): Promise<TrendingItem[]> => {
  try {
    const data = await apiClient.get<TrendingItem[]>(API_ENDPOINTS.DESTINATIONS.TRENDING);
    if (Array.isArray(data) && data.length > 0) {
      return await Promise.all(data.map(async (d: TrendingItem) => ({ ...d, imageUrl: d.imageUrl || await getDestinationImage(`${d.name} ${d.country}`) })));
    }
  } catch (e) {
    console.warn("[discover] Backend unavailable:", e);
  }
  const list = [
    { id: "lisbon", name: "Lisbon", country: "Portugal", popularityScore: 98, growthPercentage: 24, avgTemp: "22C", bestMonth: "September" },
    { id: "capetown", name: "Cape Town", country: "South Africa", popularityScore: 95, growthPercentage: 18, avgTemp: "25C", bestMonth: "November" },
    { id: "oahu", name: "Oahu", country: "Hawaii", popularityScore: 91, growthPercentage: 12, avgTemp: "28C", bestMonth: "May" },
  ];
  return await Promise.all(list.map(async (d) => ({ ...d, imageUrl: await getDestinationImage(`${d.name} ${d.country}`) })));
};
