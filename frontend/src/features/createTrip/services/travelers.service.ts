export interface AdvisorGuidance {
  title: string
  tips: string[]
}

export const getTravelersAdvice = async (groupType: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  if (groupType === "solo") {
    return "Solo travelers often enjoy flexible itineraries with spontaneous options. If you're traveling alone, I'll prioritize safe, easily navigable areas."
  }
  if (groupType === "family") {
    return "Traveling with kids in tow! I will recommend child-friendly museum passes, spacious family suites, and relaxed itineraries with low walking distances."
  }
  if (groupType === "couple") {
    return "Romantic escape! Let's prioritize cozy dinners, scenic evening overlooks, and relaxing boutique Ryokan getaways."
  }
  return "Knowing your travel companions helps me recommend the right mix of activities, pacing, and accommodations."
}
