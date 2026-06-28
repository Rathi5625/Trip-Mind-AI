export interface MarketInsight {
  flightTrendPercent: number
  flightTrendDirection: "higher" | "lower" | "stable"
  message: string
}

export const getMarketInsights = async (dest: string): Promise<MarketInsight> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    flightTrendPercent: 12,
    flightTrendDirection: "lower",
    message: "Flight prices to Tokyo are trending 12% lower for your dates compared to the 30-day average. Now is an optimal time to secure premium economy."
  }
}
