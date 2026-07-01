import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useGeneratedTripStore } from "../store/generatedTripStore"
import { useTravelDatesStore } from "@/features/createTrip/store/travelDatesStore"
import { getGeneratedTripDetails } from "../services/generatedTrip.service"

export function useGeneratedTrip() {
  const router = useRouter()
  const destination = useTravelDatesStore((state) => state.destination) || "Bali"
  const { selectedTrip, setSelectedTrip } = useGeneratedTripStore()

  const { data: tripInfo, isLoading } = useQuery({
    queryKey: ["generatedTripDetails", destination],
    queryFn: async () => {
      const details = await getGeneratedTripDetails(destination)
      setSelectedTrip(details)
      return details
    },
    placeholderData: {
      destinationName: "Coastal Escape: Bali",
      subtitle: "Ubud & Uluwatu",
      description: "A perfectly balanced mix of relaxation and adventure, featuring hidden beaches, local culinary, and wellness spa spots.",
      duration: "7 Days",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      totalBudget: 2450,
      flightsPercentage: 40,
      staysPercentage: 35,
      savedLocationsCount: 12,
      weatherAlert: "Expect light rain on day 3. We've automatically scheduled indoor cultural activities.",
      diningSuggestion: "Book 'Locavore' 2 weeks in advance. Added to your action items.",
      placesCount: 42,
      restaurantsCount: 18,
      hotelsComparedCount: 5,
      transportRoutesCount: 9,
      savedAmount: 380,
      matchScore: 97,
      personalizedMessage: "Hi Parth!\n\nBased on your love for culture, local cuisine, and balanced travel, I've created a 7-day Bali itinerary featuring hidden beaches, authentic restaurants, and optimized travel times to avoid crowds."
    }
  })

  const handleViewPlan = () => {
    router.push("/planner/itinerary")
  }

  const handleReturnDashboard = () => {
    router.push("/dashboard")
  }

  return {
    tripInfo: selectedTrip || tripInfo,
    isLoading,
    handleViewPlan,
    handleReturnDashboard
  }
}
