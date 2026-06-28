import { Destination } from "../types/createTrip"
import { DESTINATIONS } from "../constants/destinationData"

export const searchDestinations = async (query: string): Promise<Destination[]> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800))
  
  if (!query) return DESTINATIONS

  const cleanQuery = query.toLowerCase()
  return DESTINATIONS.filter(
    (dest) =>
      dest.name.toLowerCase().includes(cleanQuery) ||
      dest.country.toLowerCase().includes(cleanQuery) ||
      dest.description.toLowerCase().includes(cleanQuery) ||
      dest.category.toLowerCase().includes(cleanQuery)
  )
}

export const getSurpriseDestination = async (): Promise<Destination> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  // Filter for highest match or random luxury
  const luxuryDests = DESTINATIONS.filter((d) => d.category === "Culinary" || d.category === "Romance")
  return luxuryDests[Math.floor(Math.random() * luxuryDests.length)]
}
