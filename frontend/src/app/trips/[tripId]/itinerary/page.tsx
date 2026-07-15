import { ItineraryPage } from "@/features/workspace/ItineraryPage"

export const metadata = {
  title: "Trip Itinerary Management — Trip Mind AI",
  description: "Manage, optimize, and personalize every day of your itinerary."
}

interface PageProps {
  params: Promise<{ tripId: string }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  return <ItineraryPage tripId={resolvedParams.tripId} />
}
