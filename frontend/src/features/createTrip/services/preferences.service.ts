export interface PreferenceInsights {
  recommendation: string
  insights: {
    planning: string
    hotels: string
    flights: string
    activities: string
  }
}

export const getPreferenceInsights = async (
  interests: string[],
  accommodation: string | null,
  pace: string
): Promise<PreferenceInsights> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (interests.length === 0) {
    return {
      recommendation: "Select interests to receive dynamic AI travel planning insights.",
      insights: {
        planning: "Select your interests to curate the ideal schedule context.",
        hotels: "Select accommodation preference to view lodging recommendations.",
        flights: "AI will analyze flight duration suited for your trip details.",
        activities: "Dynamic sightseeing ideas will appear here."
      }
    }
  }

  // Capitalize interest names for rendering
  const list = interests.map((i) => i.charAt(0).toUpperCase() + i.slice(1))
  let recText = ""
  if (interests.includes("culture") && interests.includes("culinary")) {
    recText = "Based on your interest in Culture and Culinary experiences, I recommend balancing museum visits with local food tours."
  } else if (interests.includes("nature") && interests.includes("adventure")) {
    recText = "With Nature and Adventure selected, I recommend high-trail mountain hiking coupled with wild water rafting sessions."
  } else {
    recText = `Based on your selection of ${list.join(" and ")}, we recommend curating an itinerary filled with matching themed stops.`
  }

  return {
    recommendation: recText,
    insights: {
      planning: `Your ${pace} pace is fully synced with your selected vibes (${list.slice(0, 3).join(", ")}).`,
      hotels: `Since you preferred a ${accommodation || "boutique"} stay, we will prioritize highly rated boutique boutique-hotels.`,
      flights: "Optimal flight arrivals will be matched to keep you rested.",
      activities: `We've curated a custom list of ${list.join(" and ")} activities matching your preference.`
    }
  }
}
