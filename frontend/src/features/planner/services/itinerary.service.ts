import { ItineraryDetails, IntelligenceMetrics, ItineraryBudget } from "../types/itinerary"

export interface ItineraryWorkspaceData {
  itinerary: ItineraryDetails
  metrics: IntelligenceMetrics
  budget: ItineraryBudget
}

export const INITIAL_ITINERARY_DATA: ItineraryWorkspaceData = {
  itinerary: {
    title: "Tokyo Culinary Journey",
    duration: "5 Days",
    dates: "Oct 12 - 16",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    summary: "A perfectly balanced 5-day itinerary blending traditional tea ceremonies with world-class sushi experiences.",
    days: [
      {
        id: "day-1",
        dayNumber: 1,
        title: "Tradition Meets Modernity",
        activities: [
          {
            id: "act-1-1",
            time: "09:00 AM",
            category: "Activity",
            title: "Traditional Tea Ceremony in Ueno",
            description: "Experience an authentic matcha tea preparation ceremony in a historic machiya overlooking a serene garden.",
            cost: 4500,
            coordinates: { x: 80, y: 70 },
          },
          {
            id: "act-1-2",
            time: "11:30 AM",
            category: "Activity",
            title: "Ueno Park Exploration",
            description: "Stroll through Ueno Park, home to historic temples, shrines, and Tokyo's premier cultural museums.",
            cost: 0,
            coordinates: { x: 120, y: 80 },
          },
          {
            id: "act-1-3",
            time: "01:30 PM",
            category: "Dining",
            title: "Ginza Sushi Omakase",
            description: "Indulge in a premium 15-course Chef's tasting menu at a world-renowned boutique sushi house in Ginza.",
            cost: 18000,
            coordinates: { x: 220, y: 150 },
          },
          {
            id: "act-1-4",
            time: "06:30 PM",
            category: "Activity",
            title: "Shibuya Crossing & Nightwalk",
            description: "Observe the organized chaos of the world's busiest pedestrian crossing, followed by yakitori in local alleyways.",
            cost: 2000,
            coordinates: { x: 80, y: 210 },
          },
        ],
      },
      {
        id: "day-2",
        dayNumber: 2,
        title: "Futuristic Subcultures & Skyline",
        activities: [
          {
            id: "act-2-1",
            time: "10:00 AM",
            category: "Activity",
            title: "Akihabara Electronics & Anime Hunt",
            description: "Immerse yourself in Tokyo's gaming subculture, retro-electronic alleys, and rare collectibles archives.",
            cost: 0,
            coordinates: { x: 150, y: 100 },
          },
          {
            id: "act-2-2",
            time: "01:00 PM",
            category: "Dining",
            title: "Themed Cafe Dining",
            description: "Lunch at a highly creative immersive theme dining cafe in the heart of Chiyoda district.",
            cost: 3500,
            coordinates: { x: 160, y: 120 },
          },
          {
            id: "act-2-3",
            time: "04:30 PM",
            category: "Activity",
            title: "Shinjuku Gyoen National Garden",
            description: "Contemplate zen landscape styling, glasshouses, and early autumn leaves in a vast quiet oasis.",
            cost: 500,
            coordinates: { x: 60, y: 130 },
          },
          {
            id: "act-2-4",
            time: "07:30 PM",
            category: "Dining",
            title: "Kabukicho Izakaya Feast",
            description: "Sample small plates, highballs, and grilled skewers inside Shinjuku's neon-lit nightlife districts.",
            cost: 6000,
            coordinates: { x: 70, y: 160 },
          },
        ],
      },
      {
        id: "day-3",
        dayNumber: 3,
        title: "Historic Temples & Harajuku",
        activities: [
          {
            id: "act-3-1",
            time: "09:00 AM",
            category: "Activity",
            title: "Meiji Jingu Forest Shrine Walk",
            description: "Walk under giant torii gates within a dense 170-acre forest leading to a sacred Shinto shrine complex.",
            cost: 0,
            coordinates: { x: 50, y: 140 },
          },
          {
            id: "act-3-2",
            time: "11:30 AM",
            category: "Activity",
            title: "Takeshita Street & Kawaii Sweets",
            description: "Discover street fashion boutiques, gigantic cotton candy, and colorful sweet crepes in Harajuku.",
            cost: 1500,
            coordinates: { x: 55, y: 160 },
          },
          {
            id: "act-3-3",
            time: "02:00 PM",
            category: "Dining",
            title: "Omotesando Tonkatsu Maisen",
            description: "Try arguably the tenderest tonkatsu cutlets in Tokyo, housed inside a beautiful repurposed baths hall.",
            cost: 3000,
            coordinates: { x: 75, y: 180 },
          },
          {
            id: "act-3-4",
            time: "06:00 PM",
            category: "Activity",
            title: "Roppongi Hills Sunset Observatory",
            description: "Enjoy panoramic 360-degree twilight views of Mount Fuji and Tokyo Tower from an open-air sky deck.",
            cost: 2200,
            coordinates: { x: 120, y: 220 },
          },
        ],
      },
      {
        id: "day-4",
        dayNumber: 4,
        title: "Fish Markets & Digital Art",
        activities: [
          {
            id: "act-4-1",
            time: "08:00 AM",
            category: "Dining",
            title: "Tsukiji Outer Market Food Tour",
            description: "Breakfast crawl trying rolled omelets, fresh oysters, grilled wagyu, and strawberry mochi.",
            cost: 5000,
            coordinates: { x: 230, y: 180 },
          },
          {
            id: "act-4-2",
            time: "11:00 AM",
            category: "Activity",
            title: "teamLab Planets Digital Museum",
            description: "Walk barefoot through immersive light projection rooms, floating orchid gardens, and mirror mazes.",
            cost: 3800,
            coordinates: { x: 280, y: 230 },
          },
          {
            id: "act-4-3",
            time: "03:00 PM",
            category: "Transit",
            title: "Tokyo Bay Cruise to Asakusa",
            description: "Board a futuristic water bus and sail down the Sumida River to historic downtown Asakusa.",
            cost: 1600,
            coordinates: { x: 240, y: 140 },
          },
          {
            id: "act-4-4",
            time: "05:00 PM",
            category: "Activity",
            title: "Senso-ji Temple & Nakamise Shopping",
            description: "Explore Tokyo's oldest Buddhist temple and shop for traditional craft souvenirs and snacks.",
            cost: 0,
            coordinates: { x: 210, y: 60 },
          },
        ],
      },
      {
        id: "day-5",
        dayNumber: 5,
        title: "Gourmet Coffee & Departures",
        activities: [
          {
            id: "act-5-1",
            time: "09:30 AM",
            category: "Dining",
            title: "Kiyosumi Shirakawa Coffee Trail",
            description: "Taste third-wave artisanal filter brews in Tokyo's quiet canals and coffee warehouse roasting district.",
            cost: 1200,
            coordinates: { x: 260, y: 110 },
          },
          {
            id: "act-5-2",
            time: "12:00 PM",
            category: "Activity",
            title: "Last Minute Souvenir Hunt in Shibuya",
            description: "Pick up matcha treats, skin care products, and magnetic design souvenirs in Shibuya Loft store.",
            cost: 4000,
            coordinates: { x: 80, y: 210 },
          },
          {
            id: "act-5-3",
            time: "03:00 PM",
            category: "Transit",
            title: "Narita Express Airport Transfer",
            description: "Board the comfortable Narita Express rail link from Tokyo Station directly to your departures gate.",
            cost: 3200,
            coordinates: { x: 190, y: 130 },
          },
        ],
      },
    ],
  },
  metrics: {
    readiness: 85,
    visaStatus: "Visa & Hotel Confirmed",
    priceAlert: "Flights to Tokyo down 15%",
    temp: "22°",
    weatherStatus: "Oct Avg. Sunny",
    crowdLevel: "Moderate",
    crowdStatus: "Autumn Peak",
  },
  budget: {
    total: 350000,
    flights: 120000,
    hotel: 150000,
    hotelDetails: "5 nights",
    daily: 80000,
  },
}

export const itineraryService = {
  getItineraryData: async (): Promise<ItineraryWorkspaceData> => {
    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    return INITIAL_ITINERARY_DATA
  },

  editItinerary: async (prompt: string, currentData: ItineraryWorkspaceData): Promise<ItineraryWorkspaceData> => {
    // Simulate AI generation time
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const promptLower = prompt.toLowerCase()

    // Deep clone current data to modify safely
    const newData = JSON.parse(JSON.stringify(currentData)) as ItineraryWorkspaceData

    if (promptLower.includes("coffee") || promptLower.includes("cafe")) {
      // Add coffee activities on Day 1
      const day1 = newData.itinerary.days.find((d) => d.dayNumber === 1)
      if (day1) {
        day1.activities.splice(1, 0, {
          id: `act-1-coffee-${Date.now()}`,
          time: "10:30 AM",
          category: "Dining",
          title: "Artisanal Coffee in Yanaka",
          description: "Enjoy a cup of hand-poured single origin brew at a nostalgic wooden cafe tucked in old-town Yanaka.",
          cost: 800,
          coordinates: { x: 100, y: 75 },
        })
        // Adjust total budget
        newData.budget.total += 800
        newData.budget.daily += 800
      }
    } else if (promptLower.includes("hidden gem") || promptLower.includes("gem") || promptLower.includes("local")) {
      // Inject local hidden gems in Day 1 or Day 2
      const day1 = newData.itinerary.days.find((d) => d.dayNumber === 1)
      if (day1) {
        day1.activities.push({
          id: `act-1-gem-${Date.now()}`,
          time: "08:30 PM",
          category: "Activity",
          title: "Hidden Izakaya Golden Gai",
          description: "Visit a tiny, cozy 4-seat bar tucked away on the narrow 2nd floor alleyways of historic Golden Gai.",
          cost: 3500,
          coordinates: { x: 110, y: 190 },
        })
        newData.budget.total += 3500
        newData.budget.daily += 3500
      }
    } else if (promptLower.includes("budget") || promptLower.includes("cheaper") || promptLower.includes("optimize")) {
      // Optimize prices
      newData.budget.hotel -= 25000
      newData.budget.flights -= 15000
      newData.budget.total -= 40000
      newData.metrics.readiness = 95
      newData.metrics.priceAlert = "Optimal Budget Achieved!"
    } else if (promptLower.includes("relax") || promptLower.includes("slower")) {
      // Remove crowded/rushed activities
      const day1 = newData.itinerary.days.find((d) => d.dayNumber === 1)
      if (day1 && day1.activities.length > 2) {
        day1.activities = day1.activities.filter((act) => act.category !== "Dining")
      }
      newData.metrics.crowdLevel = "Low"
      newData.metrics.crowdStatus = "Relaxed Pace"
    }

    return newData
  },
}
