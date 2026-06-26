import { PromptSuggestion, TripTemplate, SavedTrip, DestinationInfo } from "../types/planner"

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: "suggestion-europe",
    icon: "Euro",
    title: "Europe under €2,000",
    description: "10 days across Italy and France on a budget.",
    promptText: "Plan a 10-day budget trip to Italy and France for under €2,000. Include low-cost hostels, train routes, and free local activities...",
  },
  {
    id: "suggestion-swiss",
    icon: "Heart",
    title: "Romantic Swiss Alps",
    description: "7 days of luxury and breathtaking views.",
    promptText: "Draft a romantic 7-day luxury itinerary through the Swiss Alps. We want scenic trains, boutique chalet hotels, and spa recommendations...",
  },
  {
    id: "suggestion-tokyo",
    icon: "Compass",
    title: "Food Tour in Tokyo",
    description: "5-day culinary exploration of sushi and ramen.",
    promptText: "Planning a 5-day foodie trip to Tokyo for 2 people in October. We love sushi, authentic ramen, and want to visit a traditional tea ceremony...",
  },
  {
    id: "suggestion-bali",
    icon: "Sparkles",
    title: "Family Vacation in Bali",
    description: "8-day tropical relaxation and temples.",
    promptText: "Create an 8-day family vacation to Bali, Indonesia. We are traveling with kids, want a private villa near Ubud, beach club visits, and cultural temple tours...",
  },
  {
    id: "suggestion-iceland",
    icon: "Navigation",
    title: "Adventure in Iceland",
    description: "6 days of glaciers, waterfalls, and volcanos.",
    promptText: "Design a 6-day road trip around Iceland's Ring Road. Focus on glacier hikes, hot springs, waterfalls, and chasing the Northern Lights...",
  },
]

export const TRIP_TEMPLATES: TripTemplate[] = [
  { id: "temp-beach", label: "Beach", icon: "Palmtree" },
  { id: "temp-mountain", label: "Mountain", icon: "Mountain" },
  { id: "temp-food", label: "Food Tour", icon: "Utensils" },
  { id: "temp-luxury", label: "Luxury", icon: "Crown" },
  { id: "temp-backpack", label: "Backpacking", icon: "Compass" },
  { id: "temp-honeymoon", label: "Honeymoon", icon: "Heart" },
]

export const SAVED_TRIPS: SavedTrip[] = [
  { id: "saved-tokyo", title: "Tokyo Autumn 2024", date: "Oct 12" },
  { id: "saved-bali", title: "Bali Retreat", date: "Nov 5" },
  { id: "saved-swiss", title: "Swiss Alps Winter", date: "Dec 18" },
]

export const INITIAL_DESTINATION: DestinationInfo = {
  name: "Paris, France",
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
  temp: "22°C",
  weather: "Sunny",
  crowdLevel: "High",
  budget: {
    flights: 800,
    hotels: 1200,
    daily: 450,
    total: 2450,
  },
}
