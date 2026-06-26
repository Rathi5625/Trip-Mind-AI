import { ItineraryDetails, DayPlan, IntelligenceMetrics, ItineraryBudget } from "../types/itinerary"

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
        walkingDistance: "8.2 km",
        timeRange: "09:00–21:00",
        completedCount: 4,
        activities: [
          {
            id: "act-1-1",
            time: "09:00 AM",
            category: "Activity",
            title: "Traditional Tea Ceremony in Ueno",
            description: "Experience an authentic matcha tea preparation ceremony in a historic machiya overlooking a serene garden.",
            cost: 4500,
            coordinates: { x: 80, y: 70 },
            duration: "1.5 hours",
            distanceToNext: "Walking: 1.1 km",
            aiTips: "💡 Arrive 10 minutes early to enjoy the garden view. Silk clothing or socks are required.",
            bookingUrl: "https://example.com/book-ueno-tea",
            notes: "My notes: Remember to take off shoes before entering the Tatami room.",
            nearbyAttractions: ["Ueno Royal Museum", "Shinobazu Pond"],
            transportOptions: "Ueno Station (JR Yamanote Line)",
          },
          {
            id: "act-1-2",
            time: "11:30 AM",
            category: "Activity",
            title: "Ueno Park Exploration",
            description: "Stroll through Ueno Park, home to historic temples, shrines, and Tokyo's premier cultural museums.",
            cost: 0,
            coordinates: { x: 120, y: 80 },
            duration: "2 hours",
            distanceToNext: "Subway (Ginza Line): 25 mins",
            aiTips: "💡 The National Museum is closed on Mondays. Admission to temple grounds is free.",
            bookingUrl: "https://example.com/ueno-museum-tix",
            notes: "",
            nearbyAttractions: ["Tokyo National Museum", "Ueno Zoo"],
            transportOptions: "Ueno-okachimachi Subway Station",
          },
          {
            id: "act-1-3",
            time: "01:30 PM",
            category: "Dining",
            title: "Ginza Sushi Omakase",
            description: "Indulge in a premium 15-course Chef's tasting menu at a world-renowned boutique sushi house in Ginza.",
            cost: 18000,
            coordinates: { x: 220, y: 150 },
            duration: "1.5 hours",
            distanceToNext: "Subway (Yamanote Line): 18 mins",
            aiTips: "💡 Reservation is strictly required 30 days in advance. Let Chef know of shellfish allergies.",
            bookingUrl: "https://example.com/ginza-sushi-reserve",
            notes: "",
            nearbyAttractions: ["Kabukiza Theatre", "Ginza Six Shopping Mall"],
            transportOptions: "Ginza Metro Station (Exit A3)",
          },
          {
            id: "act-1-4",
            time: "06:30 PM",
            category: "Activity",
            title: "Shibuya Crossing & Nightwalk",
            description: "Observe the organized chaos of the world's busiest pedestrian crossing, followed by yakitori in local alleyways.",
            cost: 2000,
            coordinates: { x: 80, y: 210 },
            duration: "2.5 hours",
            distanceToNext: "Walking: 500m to Hotel",
            aiTips: "💡 The best aerial photos are taken from the Mag's Park rooftop crossing observatory.",
            bookingUrl: "https://example.com/shibuya-sky-observatory",
            notes: "",
            nearbyAttractions: ["Hachiko Statue", "Shibuya 109 Mall"],
            transportOptions: "Shibuya Terminal Station",
          },
        ],
      },
      {
        id: "day-2",
        dayNumber: 2,
        title: "Futuristic Subcultures & Skyline",
        walkingDistance: "5.4 km",
        timeRange: "10:00–22:00",
        completedCount: 4,
        activities: [
          {
            id: "act-2-1",
            time: "10:00 AM",
            category: "Activity",
            title: "Akihabara Electronics & Anime Hunt",
            description: "Immerse yourself in Tokyo's gaming subculture, retro-electronic alleys, and rare collectibles archives.",
            cost: 0,
            coordinates: { x: 150, y: 100 },
            duration: "3 hours",
            distanceToNext: "Transit: 12 mins",
            aiTips: "💡 Check out Radio Kaikan building for multiple floors of figures and toys.",
            bookingUrl: "https://example.com/akihabara-tour",
            notes: "",
            nearbyAttractions: ["Kanda Shrine", "Yodobashi Camera Akiba"],
            transportOptions: "Akihabara Station (JR Line)",
          },
          {
            id: "act-2-2",
            time: "01:00 PM",
            category: "Dining",
            title: "Themed Cafe Dining",
            description: "Lunch at a highly creative immersive theme dining cafe in the heart of Akihabara district.",
            cost: 3500,
            coordinates: { x: 160, y: 120 },
            duration: "1.5 hours",
            distanceToNext: "Subway: 20 mins",
            aiTips: "💡 Food is average but the performance and themed decorations are highly entertaining.",
            bookingUrl: "https://example.com/cafe-akiba-book",
            notes: "",
            nearbyAttractions: ["Chuo-dori Shopping Street"],
            transportOptions: "Suehirocho Subway Station",
          },
          {
            id: "act-2-3",
            time: "04:30 PM",
            category: "Activity",
            title: "Shinjuku Gyoen National Garden",
            description: "Contemplate zen landscape styling, glasshouses, and early autumn leaves in a vast quiet oasis.",
            cost: 500,
            coordinates: { x: 60, y: 130 },
            duration: "2 hours",
            distanceToNext: "Walking: 10 mins",
            aiTips: "💡 Alcoholic beverages are forbidden on garden grounds. Last entry is at 4 PM.",
            bookingUrl: "https://example.com/shinjuku-gyoen-tickets",
            notes: "",
            nearbyAttractions: ["Hanazono Shrine", "Shinjuku City Hall"],
            transportOptions: "Shinjuku-gyoemmae Metro Station",
          },
          {
            id: "act-2-4",
            time: "07:30 PM",
            category: "Dining",
            title: "Kabukicho Izakaya Feast",
            description: "Sample small plates, highballs, and grilled skewers inside Shinjuku's neon-lit nightlife districts.",
            cost: 6000,
            coordinates: { x: 70, y: 160 },
            duration: "2.5 hours",
            distanceToNext: "Transit: 15 mins to Hotel",
            aiTips: "💡 Golden Gai has over 200 tiny bars. Most bars charge a cover seat fee of ¥500 - ¥1,000.",
            bookingUrl: "https://example.com/izakaya-shinjuku",
            notes: "",
            nearbyAttractions: ["Omoide Yokocho Alley", "Godzilla Head"],
            transportOptions: "Shinjuku Central Station",
          },
        ],
      },
      {
        id: "day-3",
        dayNumber: 3,
        title: "Historic Temples & Harajuku",
        walkingDistance: "6.1 km",
        timeRange: "09:00–20:30",
        completedCount: 4,
        activities: [
          {
            id: "act-3-1",
            time: "09:00 AM",
            category: "Activity",
            title: "Meiji Jingu Forest Shrine Walk",
            description: "Walk under giant torii gates within a dense 170-acre forest leading to a sacred Shinto shrine complex.",
            cost: 0,
            coordinates: { x: 50, y: 140 },
            duration: "2 hours",
            distanceToNext: "Walking: 5 mins",
            aiTips: "💡 Wash your hands and mouth at the cleansing station before approaching the shrine shrine.",
            bookingUrl: "https://example.com/meiji-shrine-info",
            notes: "",
            nearbyAttractions: ["Yoyogi Park", "Harajuku Gate"],
            transportOptions: "Harajuku Station (JR Yamanote)",
          },
          {
            id: "act-3-2",
            time: "11:30 AM",
            category: "Activity",
            title: "Takeshita Street & Kawaii Sweets",
            description: "Discover street fashion boutiques, gigantic cotton candy, and colorful sweet crepes in Harajuku.",
            cost: 1500,
            coordinates: { x: 55, y: 160 },
            duration: "2 hours",
            distanceToNext: "Walking: 12 mins",
            aiTips: "💡 Weekends are extremely crowded. Keep a watch on personal belongings.",
            bookingUrl: "https://example.com/harajuku-guide",
            notes: "",
            nearbyAttractions: ["Togo Shrine", "Laforet Harajuku Mall"],
            transportOptions: "Meijijingu-mae Subway Station",
          },
          {
            id: "act-3-3",
            time: "02:00 PM",
            category: "Dining",
            title: "Omotesando Tonkatsu Maisen",
            description: "Try arguably the tenderest tonkatsu cutlets in Tokyo, housed inside a beautiful repurposed baths hall.",
            cost: 3000,
            coordinates: { x: 75, y: 180 },
            duration: "1.5 hours",
            distanceToNext: "Transit: 22 mins",
            aiTips: "💡 Try the Kurobuta (Black Pork) cutlets. Line forms fast, so 1:30 PM is optimal.",
            bookingUrl: "https://example.com/maisen-reserve",
            notes: "",
            nearbyAttractions: ["Omotesando Hills Arcade", "Nezu Museum"],
            transportOptions: "Omotesando Station (Exit A2)",
          },
          {
            id: "act-3-4",
            time: "06:00 PM",
            category: "Activity",
            title: "Roppongi Hills Sunset Observatory",
            description: "Enjoy panoramic 360-degree twilight views of Mount Fuji and Tokyo Tower from an open-air sky deck.",
            cost: 2200,
            coordinates: { x: 120, y: 220 },
            duration: "2 hours",
            distanceToNext: "Transit: 25 mins to Hotel",
            aiTips: "💡 Skydeck may close in case of strong winds. Standard indoor gallery remains open.",
            bookingUrl: "https://example.com/roppongi-skydeck-ticket",
            notes: "",
            nearbyAttractions: ["Mori Art Museum", "Mohri Garden"],
            transportOptions: "Roppongi Station (Hibiya Line)",
          },
        ],
      },
      {
        id: "day-4",
        dayNumber: 4,
        title: "Fish Markets & Digital Art",
        walkingDistance: "7.5 km",
        timeRange: "08:00–21:00",
        completedCount: 4,
        activities: [
          {
            id: "act-4-1",
            time: "08:00 AM",
            category: "Dining",
            title: "Tsukiji Outer Market Food Tour",
            description: "Breakfast crawl trying rolled omelets, fresh oysters, grilled wagyu, and strawberry mochi.",
            cost: 5000,
            coordinates: { x: 230, y: 180 },
            duration: "2.5 hours",
            distanceToNext: "Transit: 15 mins",
            aiTips: "💡 Avoid eating while walking; stands require guests to dine directly at their counters.",
            bookingUrl: "https://example.com/tsukiji-food-tour",
            notes: "",
            nearbyAttractions: ["Tsukiji Hongwanji Temple", "Hamarikyu Gardens"],
            transportOptions: "Tsukiji Subway Station",
          },
          {
            id: "act-4-2",
            time: "11:00 AM",
            category: "Activity",
            title: "teamLab Planets Digital Museum",
            description: "Walk barefoot through immersive light projection rooms, floating orchid gardens, and mirror mazes.",
            cost: 3800,
            coordinates: { x: 280, y: 230 },
            duration: "2.5 hours",
            distanceToNext: "Subway: 30 mins",
            aiTips: "💡 Shorts are recommended as some rooms have water levels rising up to your knees.",
            bookingUrl: "https://example.com/teamlab-planets-booking",
            notes: "",
            nearbyAttractions: ["Toyosu Fish Market", "Gundam Base Odaiba"],
            transportOptions: "Shin-Toyosu Yurikamome Station",
          },
          {
            id: "act-4-3",
            time: "03:00 PM",
            category: "Transit",
            title: "Tokyo Bay Cruise to Asakusa",
            description: "Board a futuristic water bus and sail down the Sumida River to historic downtown Asakusa.",
            cost: 1600,
            coordinates: { x: 240, y: 140 },
            duration: "1.5 hours",
            distanceToNext: "Walking: 5 mins",
            aiTips: "💡 Designed by Leiji Matsumoto, these futuristic cruisers offer rooftop viewing hatches.",
            bookingUrl: "https://example.com/tokyo-cruise-line",
            notes: "",
            nearbyAttractions: ["Sumida Park", "Asakusa Station Depot"],
            transportOptions: "Asakusa Pier Terminal",
          },
          {
            id: "act-4-4",
            time: "05:00 PM",
            category: "Activity",
            title: "Senso-ji Temple & Nakamise Shopping",
            description: "Explore Tokyo's oldest Buddhist temple and shop for traditional craft souvenirs and snacks.",
            cost: 0,
            coordinates: { x: 210, y: 60 },
            duration: "2.5 hours",
            distanceToNext: "Transit: 30 mins to Hotel",
            aiTips: "💡 Try fresh Ningyo-yaki bean cakes. Lights turn on at dusk, making it a perfect evening stroll.",
            bookingUrl: "https://example.com/sensoji-guide",
            notes: "",
            nearbyAttractions: ["Asakusa Hanayashiki Amusement Park", "Kaminarimon Gate"],
            transportOptions: "Asakusa Station (Ginza Line)",
          },
        ],
      },
      {
        id: "day-5",
        dayNumber: 5,
        title: "Gourmet Coffee & Departures",
        walkingDistance: "3.2 km",
        timeRange: "09:30–17:00",
        completedCount: 3,
        activities: [
          {
            id: "act-5-1",
            time: "09:30 AM",
            category: "Dining",
            title: "Kiyosumi Shirakawa Coffee Trail",
            description: "Taste third-wave artisanal filter brews in Tokyo's quiet canals and coffee warehouse roasting district.",
            cost: 1200,
            coordinates: { x: 260, y: 110 },
            duration: "2 hours",
            distanceToNext: "Transit: 18 mins",
            aiTips: "💡 Blue Bottle Coffee Roastery and ARiSE Coffee Entangle are highly popular specialty shops.",
            bookingUrl: "https://example.com/kiyosumi-coffee-trail",
            notes: "",
            nearbyAttractions: ["Kiyosumi Gardens", "Museum of Contemporary Art Tokyo"],
            transportOptions: "Kiyosumi-shirakawa Subway Station",
          },
          {
            id: "act-5-2",
            time: "12:00 PM",
            category: "Activity",
            title: "Last Minute Souvenir Hunt in Shibuya",
            description: "Pick up matcha treats, skin care products, and magnetic design souvenirs in Shibuya Loft store.",
            cost: 4000,
            coordinates: { x: 80, y: 210 },
            duration: "2 hours",
            distanceToNext: "Transit: 45 mins to Airport",
            aiTips: "💡 Take advantage of duty-free discounts by presenting your passport at checkout.",
            bookingUrl: "https://example.com/loft-shibuya",
            notes: "",
            nearbyAttractions: ["Shibuya Stream", "Miyashita Park Complex"],
            transportOptions: "Shibuya Station Platform 4",
          },
          {
            id: "act-5-3",
            time: "03:00 PM",
            category: "Transit",
            title: "Narita Express Airport Transfer",
            description: "Board the comfortable Narita Express rail link from Tokyo Station directly to your departures gate.",
            cost: 3200,
            coordinates: { x: 190, y: 130 },
            duration: "1.5 hours",
            distanceToNext: "Departures Gate",
            aiTips: "💡 Keep ticket handy. Free Wi-Fi and electric outlets are available in Narita Express carriages.",
            bookingUrl: "https://example.com/narita-express-ticket",
            notes: "",
            nearbyAttractions: ["Narita Airport Duty Free Shops"],
            transportOptions: "Airport Terminal 1 / 2 Station",
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

    if (promptLower.includes("coffee") || promptLower.includes("cafe") || promptLower.includes("food")) {
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
          duration: "1 hour",
          distanceToNext: "Walking: 650m",
          aiTips: "💡 Perfect local hideout to relax between sightseeing runs. Try the cold drip.",
          bookingUrl: "https://example.com/yanaka-coffee",
          notes: "",
          nearbyAttractions: ["Yanaka Cemetery Walk", "Nezu Shrine Alley"],
          transportOptions: "Nippori Station (JR Line)",
        })
        day1.completedCount = day1.activities.length
        
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
          duration: "2 hours",
          distanceToNext: "End of Day 1",
          aiTips: "💡 Cash only. Space is tight, so look for open window slots to check seats.",
          bookingUrl: "https://example.com/goldengai-bars",
          notes: "",
          nearbyAttractions: ["Hanazono Shrine Red Torii", "Shinjuku Neon Alley"],
          transportOptions: "Shinjuku Sanchome Subway Station",
        })
        day1.completedCount = day1.activities.length
        newData.budget.total += 3500
        newData.budget.daily += 3500
      }
    } else if (promptLower.includes("budget") || promptLower.includes("cheaper") || promptLower.includes("optimize") || promptLower.includes("hotel")) {
      // Optimize prices
      newData.budget.hotel -= 25000
      newData.budget.flights -= 15000
      newData.budget.total -= 40000
      newData.metrics.readiness = 95
      newData.metrics.priceAlert = "Optimal Budget Achieved!"
    } else if (promptLower.includes("relax") || promptLower.includes("slower") || promptLower.includes("time")) {
      // Remove crowded/rushed activities
      const day1 = newData.itinerary.days.find((d) => d.dayNumber === 1)
      if (day1 && day1.activities.length > 2) {
        day1.activities = day1.activities.filter((act) => act.category !== "Dining")
        day1.completedCount = day1.activities.length
      }
      newData.metrics.crowdLevel = "Low"
      newData.metrics.crowdStatus = "Relaxed Pace"
    }

    return newData
  },
}
