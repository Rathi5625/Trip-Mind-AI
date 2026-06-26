import { DestinationInfo } from "../types/planner"

export interface GenerationResult {
  destination: DestinationInfo
  itinerary: string
}

export const plannerService = {
  generateTripPlan: async (prompt: string): Promise<GenerationResult> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const promptLower = prompt.toLowerCase()

    if (promptLower.includes("tokyo") || promptLower.includes("japan")) {
      return {
        destination: {
          name: "Tokyo, Japan",
          image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
          temp: "19°C",
          weather: "Clear",
          crowdLevel: "High",
          budget: { flights: 95000, hotels: 110000, daily: 55000, total: 260000 },
          savings: {
            estimated: 260000,
            savings: 34000,
            cheaperFlights: true,
            betterHotels: true,
            restaurantDeals: true,
          },
          travelScore: {
            score: 98,
            weather: 5,
            budget: 4,
            safety: 5,
            crowdLevel: 4,
            recommendation: "Excellent Choice",
          },
          markers: [
            { label: "Shibuya Crossing", x: 80, y: 190, type: "attraction" },
            { label: "Shinjuku Park", x: 120, y: 100, type: "attraction" },
            { label: "Tsukiji Market", x: 240, y: 220, type: "attraction" },
            { label: "Tokyo Grand Palace", x: 180, y: 150, type: "hotel" },
          ],
          routes: [
            { x1: 120, y1: 100, x2: 80, y2: 190 },
            { x1: 80, y1: 190, x2: 240, y2: 220 },
            { x1: 240, y1: 220, x2: 180, y2: 150 },
          ],
        },
        itinerary: `## Tokyo Culinary & Culture Itinerary (5 Days)

Here is your custom AI food tour itinerary:

### Day 1: Shinjuku & Yakitori Alley
- **Morning:** Land at Haneda, private transfer to Shinjuku.
- **Afternoon:** Explore Gyoen National Garden for autumn leaves.
- **Evening:** Dine in Omoide Yokocho (Memory Lane) for authentic yakitori and local sake.

### Day 2: Tsukiji Outer Market & Tea Ceremony
- **Morning:** Sushi breakfast crawl at Tsukiji. Try fresh uni and fatty tuna.
- **Afternoon:** Participate in a traditional tea ceremony in Ginza.
- **Evening:** Omakase dinner experience in Roppongi.

### Day 3: Shibuya, Harajuku & Michelin Ramen
- **Morning:** Cross Shibuya Scramble and explore Meiji Shrine.
- **Afternoon:** Harajuku fashion walk, sweet crepes.
- **Evening:** Michelin-starred Tonkotsu ramen at Konjiki Hototogisu.`,
      }
    }

    if (promptLower.includes("swiss") || promptLower.includes("alps") || promptLower.includes("switzerland")) {
      return {
        destination: {
          name: "Swiss Alps, Switzerland",
          image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
          temp: "8°C",
          weather: "Snowy",
          crowdLevel: "Medium",
          budget: { flights: 120000, hotels: 210000, daily: 80000, total: 410000 },
          savings: {
            estimated: 410000,
            savings: 45000,
            cheaperFlights: true,
            betterHotels: true,
            restaurantDeals: false,
          },
          travelScore: {
            score: 95,
            weather: 5,
            budget: 3,
            safety: 5,
            crowdLevel: 2,
            recommendation: "Excellent Choice",
          },
          markers: [
            { label: "Lucerne Station", x: 110, y: 100, type: "start" },
            { label: "Mt. Pilatus Peak", x: 150, y: 160, type: "attraction" },
            { label: "Alps Chalet Resort", x: 210, y: 220, type: "hotel" },
          ],
          routes: [
            { x1: 110, y1: 100, x2: 150, y2: 160 },
            { x1: 150, y1: 160, x2: 210, y2: 220 },
          ],
        },
        itinerary: `## Romantic Swiss Alps Chalet Retreat (7 Days)

Your winter wonderland escape awaits:

### Day 1: Zurich to Lucerne Scenic Rail
- **Morning:** Board the Glacier Express link to Lucerne.
- **Afternoon:** Walk Chapel Bridge, enjoy lakeside chocolate.
- **Evening:** Candlelit Swiss fondue dinner.

### Day 2: Mount Pilatus Ascent
- **Morning:** Cogwheel railway up Mt. Pilatus.
- **Afternoon:** Alpine sledding and snowshoeing.
- **Evening:** Spa massage in your mountain chalet.`,
      }
    }

    if (promptLower.includes("bali") || promptLower.includes("indonesia")) {
      return {
        destination: {
          name: "Bali, Indonesia",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
          temp: "29°C",
          weather: "Humid",
          crowdLevel: "Medium",
          budget: { flights: 70000, hotels: 80000, daily: 30000, total: 180000 },
          savings: {
            estimated: 180000,
            savings: 22000,
            cheaperFlights: true,
            betterHotels: true,
            restaurantDeals: true,
          },
          travelScore: {
            score: 92,
            weather: 4,
            budget: 5,
            safety: 4,
            crowdLevel: 3,
            recommendation: "Great Choice",
          },
          markers: [
            { label: "Denpasar Airport", x: 100, y: 200, type: "start" },
            { label: "Ubud Villa Resort", x: 140, y: 120, type: "hotel" },
            { label: "Uluwatu Temple", x: 210, y: 240, type: "attraction" },
          ],
          routes: [
            { x1: 100, y1: 200, x2: 140, y2: 120 },
            { x1: 140, y1: 120, x2: 210, y2: 240 },
          ],
        },
        itinerary: `## Tropical Bali Family Adventure (8 Days)

Your tropical island itinerary details:

### Day 1: Land in Ubud Jungle
- **Morning:** Arrival, private transfers to villa.
- **Afternoon:** Ubud Monkey Forest exploration.
- **Evening:** Dinner at Locavore.`,
      }
    }

    if (promptLower.includes("iceland")) {
      return {
        destination: {
          name: "Iceland Ring Road",
          image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
          temp: "5°C",
          weather: "Windy",
          crowdLevel: "Low",
          budget: { flights: 90000, hotels: 150000, daily: 60000, total: 300000 },
          savings: {
            estimated: 300000,
            savings: 26000,
            cheaperFlights: true,
            betterHotels: false,
            restaurantDeals: true,
          },
          travelScore: {
            score: 94,
            weather: 3,
            budget: 4,
            safety: 5,
            crowdLevel: 1,
            recommendation: "Great Choice",
          },
          markers: [
            { label: "Reykjavik Town", x: 100, y: 150, type: "start" },
            { label: "Blue Lagoon Spa", x: 70, y: 180, type: "attraction" },
            { label: "Vik Black Beach", x: 220, y: 210, type: "attraction" },
            { label: "Foss Hotel", x: 170, y: 160, type: "hotel" },
          ],
          routes: [
            { x1: 100, y1: 150, x2: 70, y2: 180 },
            { x1: 70, y1: 180, x2: 170, y2: 160 },
            { x1: 170, y1: 160, x2: 220, y2: 210 },
          ],
        },
        itinerary: `## Iceland Golden Circle & Glaciers (6 Days)

Volcanoes, glaciers, and lights:

### Day 1: Blue Lagoon & Reykjavik
- **Morning:** Soak in the Blue Lagoon geothermal waters.
- **Afternoon:** Walk downtown Reykjavik, visit Hallgrimskirkja.
- **Evening:** Chase Northern Lights in a super-jeep.`,
      }
    }

    // Default: Paris, France
    return {
      destination: {
        name: "Paris, France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
        temp: "22°C",
        weather: "Sunny",
        crowdLevel: "High",
        budget: { flights: 80000, hotels: 120000, daily: 45000, total: 245000 },
        savings: {
          estimated: 245000,
          savings: 32000,
          cheaperFlights: true,
          betterHotels: true,
          restaurantDeals: true,
        },
        travelScore: {
          score: 97,
          weather: 5,
          budget: 4,
          safety: 5,
          crowdLevel: 3,
          recommendation: "Excellent Choice",
        },
        markers: [
          { label: "Eiffel Tower", x: 80, y: 130, type: "attraction" },
          { label: "Louvre Museum", x: 180, y: 110, type: "attraction" },
          { label: "Grand Hotel", x: 150, y: 180, type: "hotel" },
        ],
        routes: [
          { x1: 80, y1: 130, x2: 180, y2: 110 },
          { x1: 180, y1: 110, x2: 150, y2: 180 },
        ],
      },
      itinerary: `## Paris, France - Budget Explorer (10 Days)

Your custom Parisian itinerary:

### Day 1: Eiffel Tower & Seine Cruise
- **Morning:** Climb Eiffel Tower early to skip queues.
- **Afternoon:** Stroll along the Seine, visit Louvre gardens.
- **Evening:** Sunset boat cruise down the Seine river.`,
    };
  },
}
