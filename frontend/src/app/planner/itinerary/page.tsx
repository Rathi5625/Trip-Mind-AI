import { ItineraryWorkspace } from "@/features/planner/ItineraryWorkspace"

export const metadata = {
  title: "Trip Mind AI — AI Itinerary Workspace",
  description: "Review, adjust, and optimize your generated travel itineraries. Recalculate budgets and explore live routes in real time.",
}

export default function Page() {
  return <ItineraryWorkspace />
}
