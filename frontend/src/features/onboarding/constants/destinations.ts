import { Destination } from "../types/destination"

import { apiClient } from "@/services/apiClient"
import { API_ENDPOINTS } from "@/constants/endpoints"

const getDestinationImage = async (name: string): Promise<string> => {
  try {
    const data = await apiClient.get<{ imageUrl?: string }>(API_ENDPOINTS.AI.IMAGE(`${name} travel destination`))
    if (data?.imageUrl) {
      return data.imageUrl
    }
  } catch (_) {}
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
}

export const loadOnboardingDestinations = async (): Promise<Destination[]> => {
  return await Promise.all(
    DEFAULT_DESTINATIONS.map(async (d) => ({
      ...d,
      imageUrl: await getDestinationImage(d.name),
    }))
  )
}

export const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    bestSeason: "March–May",
    averageBudget: "₹85K",
    averageBudgetValue: 85000,
    rating: 4.9,
    aiMatch: 98,
    categories: ["cities", "food", "nature", "mountains"],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
    bestSeason: "June–August",
    averageBudget: "₹120K",
    averageBudgetValue: 120000,
    rating: 4.8,
    aiMatch: 95,
    categories: ["mountains", "nature", "luxury"],
  },
  {
    id: "bali",
    name: "Bali",
    flag: "🇮🇩",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    bestSeason: "April–October",
    averageBudget: "₹45K",
    averageBudgetValue: 45000,
    rating: 4.7,
    aiMatch: 92,
    categories: ["beaches", "nature", "backpacking"],
  },
  {
    id: "iceland",
    name: "Iceland",
    flag: "🇮🇸",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Sept–March",
    averageBudget: "₹110K",
    averageBudgetValue: 110000,
    rating: 4.8,
    aiMatch: 90,
    categories: ["mountains", "nature", "backpacking"],
  },
  {
    id: "dubai",
    name: "Dubai",
    flag: "🇦🇪",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Nov–March",
    averageBudget: "₹95K",
    averageBudgetValue: 95000,
    rating: 4.6,
    aiMatch: 88,
    categories: ["cities", "luxury"],
  },
  {
    id: "paris",
    name: "Paris",
    flag: "🇫🇷",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    bestSeason: "April–June",
    averageBudget: "₹100K",
    averageBudgetValue: 100000,
    rating: 4.7,
    aiMatch: 91,
    categories: ["cities", "luxury", "food"],
  },
  {
    id: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-2f5337a99442?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Nov–Feb",
    averageBudget: "₹40K",
    averageBudgetValue: 40000,
    rating: 4.6,
    aiMatch: 93,
    categories: ["beaches", "food", "backpacking"],
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    bestSeason: "May–Sept",
    averageBudget: "₹90K",
    averageBudgetValue: 90000,
    rating: 4.9,
    aiMatch: 96,
    categories: ["cities", "food", "luxury", "beaches"],
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Feb–April",
    averageBudget: "₹75K",
    averageBudgetValue: 75000,
    rating: 4.7,
    aiMatch: 89,
    categories: ["cities", "luxury", "food"],
  },
  {
    id: "maldives",
    name: "Maldives",
    flag: "🇲🇻",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Nov–April",
    averageBudget: "₹130K",
    averageBudgetValue: 130000,
    rating: 4.9,
    aiMatch: 94,
    categories: ["beaches", "luxury"],
  },
  {
    id: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Sept–Nov",
    averageBudget: "₹80K",
    averageBudgetValue: 80000,
    rating: 4.7,
    aiMatch: 90,
    categories: ["cities", "food", "nature"],
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    bestSeason: "Dec–Feb",
    averageBudget: "₹115K",
    averageBudgetValue: 115000,
    rating: 4.9,
    aiMatch: 94,
    categories: ["mountains", "nature", "backpacking"],
  },
]

export const ONBOARDING_DESTINATIONS = DEFAULT_DESTINATIONS
