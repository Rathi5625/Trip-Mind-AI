import { AIOutlook } from "../types/review"

export const getReviewInsights = async (
  destination: string,
  interests: string[],
  datesStr: string = ""
): Promise<AIOutlook> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const hasCulinary = interests.includes("culinary")
  const hasCulture = interests.includes("culture")
  const hasNature = interests.includes("nature")
  
  // Calculate match percentage dynamically
  let matchScore = 88
  if (hasCulinary) matchScore += 4
  if (hasCulture) matchScore += 4
  if (hasNature) matchScore += 3
  matchScore = Math.min(matchScore, 98) // Match user request score 98%

  // Deduce month
  let month = "September"
  if (datesStr) {
    const parts = datesStr.split(" ")
    if (parts.length > 0) {
      month = parts[0]
    }
  }

  let temp = "23°C"
  let condition = "Sunny"
  let rainStatus = "Low Rain"
  let season = "Perfect Season"
  let crowds = "Low tourist crowds"
  let matchDescription = "Highly aligned to interests"
  const warnings: string[] = []

  const destLower = destination.toLowerCase()
  if (destLower.includes("amalfi")) {
    temp = "23°C"
    condition = "Sunny"
    rainStatus = "Low Rain"
    season = "Perfect Season"
    crowds = "Moderate crowds"
    matchDescription = "Perfect coastal & culinary match"
    warnings.push("Museums are closed on Mondays. We'll automatically adjust your itinerary.")
  } else if (destLower.includes("tokyo")) {
    temp = "19°C"
    condition = "Clear"
    rainStatus = "Dry Season"
    season = "Great Season"
    crowds = "High tourist crowds"
    matchDescription = "Exceptional city & culinary alignment"
    warnings.push("Senso-ji temple grounds have early evening closures. Scheduling morning visits.")
  } else if (destLower.includes("paris")) {
    temp = "16°C"
    condition = "Overcast"
    rainStatus = "Moderate Rain"
    season = "Chic Autumn Season"
    crowds = "Moderate crowds"
    matchDescription = "Romantic arts & culture alignment"
    warnings.push("Eiffel Tower Summit elevator maintenance scheduled. Auto-adjusting slots.")
  } else {
    warnings.push("General seasonal local advice applied to itinerary curation slots.")
  }

  return {
    matchScore,
    matchDescription,
    weatherForecast: {
      month,
      temp,
      condition,
      rainStatus,
      season
    },
    crowds,
    readiness: 98,
    confidence: 98,
    warnings,
    estimatedTimeSeconds: 18
  }
}

export const generateTripPlanSimulated = async (
  onProgress: (prog: number) => void
): Promise<void> => {
  return new Promise((resolve) => {
    let current = 0
    const interval = setInterval(() => {
      current += 5
      onProgress(current)
      if (current >= 100) {
        clearInterval(interval)
        resolve()
      }
    }, 250) // Takes about 5 seconds total
  })
}
