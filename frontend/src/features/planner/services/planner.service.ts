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
          budget: { flights: 950, hotels: 1100, daily: 550, total: 2600 },
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
          budget: { flights: 1200, hotels: 2100, daily: 800, total: 4100 },
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
          budget: { flights: 700, hotels: 800, daily: 300, total: 1800 },
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
          budget: { flights: 900, hotels: 1500, daily: 600, total: 3000 },
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
        budget: { flights: 800, hotels: 1200, daily: 450, total: 2450 },
      },
      itinerary: `## Paris, France - Budget Explorer (10 Days)

Your custom Parisian itinerary:

### Day 1: Eiffel Tower & Seine Cruise
- **Morning:** Climb Eiffel Tower early to skip queues.
- **Afternoon:** Stroll along the Seine, visit Louvre gardens.
- **Evening:** Sunset boat cruise down the Seine river.

### Day 2: Montmartre Artisans
- **Morning:** Coffee and croissants in Montmartre, visit Sacré-Cœur.
- **Afternoon:** View local art stalls in Place du Tertre.
- **Evening:** Dinner at a cozy French bistro.`,
    };
  },
}
