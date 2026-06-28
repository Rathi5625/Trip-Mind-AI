import { SeasonStats } from "../types/travelDates"
import { TOKYO_SEASON_STATS } from "../constants/seasonData"

export const getDatesInsights = async (
  dest: string,
  start: Date | null,
  end: Date | null
): Promise<SeasonStats> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  
  if (!start || !end) return TOKYO_SEASON_STATS

  // Dynamically vary weather/pricing depending on selected dates
  const startDay = start.getDate()
  const endDay = end.getDate()
  const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  
  let weatherTemp = "22°C / 14°C"
  let weatherDesc = "Clear Skies"
  let costIndex = "Mid-Range (Avg)"
  let crowdLevel = "Moderate"

  if (startDay >= 10 && endDay <= 20) {
    crowdLevel = "High (Peak)"
    costIndex = "Premium Pricing"
  } else if (diffDays > 14) {
    costIndex = "Economical Range"
  }

  return {
    weatherTemp,
    weatherDesc,
    costIndex,
    crowdLevel
  }
}
