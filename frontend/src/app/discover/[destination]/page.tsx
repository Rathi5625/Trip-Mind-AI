import { DestinationPage } from "@/features/destination/DestinationPage"

interface PageProps {
  params: Promise<{ destination: string }>
}

export const metadata = {
  title: "Destination Hub Details — VoyageAI",
  description: "Detailed AI stats, weather, safety index, and itineraries for your next destination."
}

export default async function DestinationRoute({ params }: PageProps) {
  const { destination } = await params
  return <DestinationPage destinationId={destination} />
}
