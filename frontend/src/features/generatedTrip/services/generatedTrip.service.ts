import { GeneratedTripInfo } from "../types/generatedTrip"

export const getGeneratedTripDetails = async (
  destination: string
): Promise<GeneratedTripInfo> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 150))

  const destLower = destination.toLowerCase()
  if (destLower.includes("tokyo")) {
    return {
      destinationName: "Modern Tokyo & Kyoto",
      subtitle: "Urban Exploration",
      description: "A perfectly optimized curation of bullet train transits, boutique hotels, Ginza culinary sessions, and historical shrine tours.",
      duration: "7 Days",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
      totalBudget: 3500,
      flightsPercentage: 45,
      staysPercentage: 30,
      savedLocationsCount: 16,
      weatherAlert: "Expect clear skies with cool evenings. Perfect season for walking tours.",
      diningSuggestion: "Book 'Sukiyabashi Jiro' 4 weeks in advance. Added to itinerary.",
      placesCount: 48,
      restaurantsCount: 22,
      hotelsComparedCount: 8,
      transportRoutesCount: 12,
      savedAmount: 420,
      matchScore: 98,
      personalizedMessage: "Hi Parth!\n\nBased on your interest in metropolitan culture, Michelin culinary stops, and fast pacing, I've built a 7-day Tokyo itinerary covering Ginza shopping, Shibuya Sky, and automated train timings."
    }
  } else if (destLower.includes("paris")) {
    return {
      destinationName: "Romantic Paris Escape",
      subtitle: "Arts & Culture",
      description: "An optimized romance-filled travel itinerary featuring Louvre museum tours, Seine sunset dinner cruises, and boutique hotel stays.",
      duration: "5 Days",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      totalBudget: 2900,
      flightsPercentage: 40,
      staysPercentage: 35,
      savedLocationsCount: 10,
      weatherAlert: "Expect light rain on day 2. Indoor museum activities scheduled.",
      diningSuggestion: "Book 'Le Jules Verne' in Eiffel Tower 3 weeks in advance. Added.",
      placesCount: 36,
      restaurantsCount: 14,
      hotelsComparedCount: 6,
      transportRoutesCount: 8,
      savedAmount: 350,
      matchScore: 95,
      personalizedMessage: "Hi Parth!\n\nBased on your passion for romantic art, historic architecture, and relaxed boutique hotel pacing, I've curated a 5-day Parisian getaway with Eiffel Tower reservations and quiet Seine dinner cruises."
    }
  }

  // Default is Bali (mockup matching screenshot exactly!)
  return {
    destinationName: "Coastal Escape: Bali",
    subtitle: "Ubud & Uluwatu",
    description: "A perfectly balanced mix of relaxation and adventure, featuring hidden beaches, local culinary, and wellness spa spots.",
    duration: "7 Days",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    totalBudget: 2450,
    flightsPercentage: 40,
    staysPercentage: 35,
    savedLocationsCount: 12,
    weatherAlert: "Expect light rain on day 3. We've automatically scheduled indoor cultural activities.",
    diningSuggestion: "Book 'Locavore' 2 weeks in advance. Added to your action items.",
    placesCount: 42,
    restaurantsCount: 18,
    hotelsComparedCount: 5,
    transportRoutesCount: 9,
    savedAmount: 380,
    matchScore: 97,
    personalizedMessage: "Hi Parth!\n\nBased on your love for culture, local cuisine, and balanced travel, I've created a 7-day Bali itinerary featuring hidden beaches, authentic restaurants, and optimized travel times to avoid crowds."
  }
}
