import { GeneratedTripInfo } from "../types/generatedTrip"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const getDestinationImage = async (name: string): Promise<string> => {
  try {
    const res = await fetch(`${API_BASE}/api/ai-chat/image?q=${encodeURIComponent(name + " travel aerial")}`)
    if (res.ok) { const d = await res.json(); return d.imageUrl }
  } catch (_) {}
  return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
}

export const getGeneratedTripDetails = async (destination: string): Promise<GeneratedTripInfo> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" }

    // Ask the AI copilot for a quick trip summary card for this destination
    const chatRes = await fetch(`${API_BASE}/api/ai-chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: `Generate a brief trip summary card for ${destination}. Return a JSON object with: destinationName (string), subtitle (string, 2-3 words like "Cultural Immersion"), description (string, max 120 chars), duration (string like "7 Days"), totalBudget (number in USD), flightsPercentage (integer), staysPercentage (integer), savedLocationsCount (integer), weatherAlert (string), diningSuggestion (string), placesCount (integer), restaurantsCount (integer), hotelsComparedCount (integer), transportRoutesCount (integer), savedAmount (integer), matchScore (integer 90-99), personalizedMessage (string). Respond ONLY with valid raw JSON.`,
        tripId: "planner",
      }),
    })

    if (chatRes.ok) {
      const chatData = await chatRes.json()
      const raw = chatData.reply || ""
      const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim()
      const start = cleaned.indexOf("{")
      const end = cleaned.lastIndexOf("}")
      if (start >= 0 && end > start) {
        const parsed = JSON.parse(cleaned.substring(start, end + 1))
        const imageUrl = await getDestinationImage(destination)
        return { ...parsed, imageUrl }
      }
    }
  } catch (e) {
    console.warn("[generatedTrip] AI summary failed:", e)
  }

  // Graceful fallback with live image
  return {
    destinationName: destination,
    subtitle: "AI Travel Plan",
    description: "Your personalized AI-generated itinerary is ready. Explore curated experiences tailored to your preferences.",
    duration: "7 Days",
    imageUrl: await getDestinationImage(destination),
    totalBudget: 2500,
    flightsPercentage: 40,
    staysPercentage: 35,
    savedLocationsCount: 12,
    weatherAlert: "Check real-time weather before departure.",
    diningSuggestion: "Explore local restaurants recommended by VoyageAI.",
    placesCount: 30,
    restaurantsCount: 15,
    hotelsComparedCount: 6,
    transportRoutesCount: 8,
    savedAmount: 300,
    matchScore: 95,
    personalizedMessage: `Your AI-generated ${destination} itinerary is ready. Tap any day to explore activities, restaurants, and hidden gems curated just for you.`,
  }
}
