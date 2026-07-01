import {
  DestinationDetails,
  Attraction,
  BudgetOption,
  SecretItem,
  SavingTip,
  TimeSeason,
  ComparisonVibe
} from "../types/destination"

export const PARIS_DETAILS: DestinationDetails = {
  id: "paris",
  name: "Paris",
  country: "France",
  rating: 4.9,
  matchScore: 98,
  imageUrls: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", // Eiffel main
    "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=600&q=80", // Cafe Paris
    "https://images.unsplash.com/photo-1550110134-e26e485c457f?auto=format&fit=crop&w=600&q=80", // Macarons
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80", // Louvre Pyramid
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80"  // Seine
  ],
  facts: {
    language: "French",
    currency: "Euro (€)",
    timezone: "GMT +1",
    visaStatus: "Not Required"
  },
  intelligence: {
    overallScore: 98,
    safetyScore: 92,
    crowdForecast: "High",
    avgDailyCost: "€350 / day",
    recommendedDuration: "4 - 6 Days",
    weatherIntel: "Partly Cloudy, average 18°C"
  }
}

export const PARIS_ATTRACTIONS: Attraction[] = [
  {
    id: "louvre",
    name: "Louvre Museum",
    category: "Historic Art & Culture",
    duration: "3h Visit",
    imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80",
    description: "The world's largest art museum, home to the Mona Lisa and classic collections.",
    popularityScore: 99
  },
  {
    id: "notredame",
    name: "Notre-Dame",
    category: "Gothic Masterpiece",
    duration: "Iconic",
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500&q=80",
    description: "A medieval Catholic cathedral widely considered one of the finest Gothic architectures.",
    popularityScore: 97
  },
  {
    id: "montmartre",
    name: "Montmartre",
    category: "Bohemian District",
    duration: "Artistic",
    imageUrl: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=500&q=80",
    description: "A large hill in Paris's 18th arrondissement, famous for its artistic history and Sacré-Cœur.",
    popularityScore: 95
  },
  {
    id: "seine",
    name: "Seine River Cruise",
    category: "Scenic Waterway",
    duration: "1.5h Tour",
    imageUrl: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=500&q=80",
    description: "Witness Paris's historic landmarks from a glass-canopied cruise boat along the Seine.",
    popularityScore: 94
  }
]

export const PARIS_BUDGETS: BudgetOption[] = [
  {
    style: "Economy",
    dailyBudget: "€120",
    hotelSuggestions: ["Charming hostels", "Shared rentals"],
    transportStyle: "Metro pass (Navigo)",
    foodSuggestions: ["Boulangerie picnics", "Street crêpes"],
    experiences: ["Free walking tours", "Free museums first Sundays"]
  },
  {
    style: "Premium",
    dailyBudget: "€350",
    hotelSuggestions: ["Boutique hotels", "Sleek Airbnb flats"],
    transportStyle: "Private taxi transfers",
    foodSuggestions: ["Michelin Bib bistrots", "Classic brasseries"],
    experiences: ["Guided museum access", "Evening Seine cruises"],
    isPopular: true
  },
  {
    style: "Ultra Luxury",
    dailyBudget: "€1,200+",
    hotelSuggestions: ["Palace hotels", "Historic suites"],
    transportStyle: "Private Chauffeur",
    foodSuggestions: ["3 Michelin star dining", "Chef table salons"],
    experiences: ["VIP museum tours", "Helicopter Versailles tours"]
  }
]

export const PARIS_SECRETS: SecretItem[] = [
  {
    id: "sec1",
    title: "Place de l'Estrapade",
    description: "A quiet square perfect for a morning coffee away from the Instagram crowds. Featured in several modern films."
  },
  {
    id: "sec2",
    title: "Canal Saint-Martin",
    description: "Skip the Seine for a night and picnic along the canal where locals gather at sunset."
  }
]

export const PARIS_SAVINGS: SavingTip[] = [
  {
    id: "save1",
    title: "First Sunday Museums",
    description: "Many major museums are free on the first Sunday of each month. Book weeks in advance."
  },
  {
    id: "save2",
    title: "The 'Formule' Lunch",
    description: "Look for fixed-price lunch menus (Formules) to enjoy gourmet dining for 50% less than dinner prices."
  }
]

export const PARIS_SEASONS: TimeSeason[] = [
  {
    name: "Spring",
    weather: "15°C - 20°C",
    prices: "Fair",
    crowdLevel: "Moderate",
    pros: ["Cherry blossoms", "Perfect walking weather"],
    cons: ["Sudden light showers"],
    aiRecommendation: "Highly recommended for sightseeing strolls.",
    isHighlighted: true
  },
  {
    name: "Summer",
    weather: "25°C - 32°C",
    prices: "Peak",
    crowdLevel: "Crowded",
    pros: ["Vibrant outdoor cafes", "Late sunsets"],
    cons: ["Very crowded", "Airfares & hotel spike"],
    aiRecommendation: "Great but expect longer lines."
  },
  {
    name: "Autumn",
    weather: "12°C - 18°C",
    prices: "Good",
    crowdLevel: "Moderate",
    pros: ["Beautiful foliage", "Harvest season wine festivals"],
    cons: ["Cooler evening winds"],
    aiRecommendation: "Foliage looks stunning in Luxembourg gardens."
  },
  {
    name: "Winter",
    weather: "3°C - 8°C",
    prices: "Low",
    crowdLevel: "Low",
    pros: ["Christmas markets", "Zero queues at Louvre"],
    cons: ["Cold & wet days"],
    aiRecommendation: "Ideal for budget indoor museum trips."
  }
]

export const PARIS_SIMILAR: ComparisonVibe[] = [
  {
    id: "rome",
    name: "Rome",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=500&q=80",
    description: "History & Culinary masterworks.",
    similarityScore: 94
  },
  {
    id: "london",
    name: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=500&q=80",
    description: "Cosmopolitan & Arts masterclasses.",
    similarityScore: 91
  },
  {
    id: "vienna",
    name: "Vienna",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=500&q=80",
    description: "Elegance & Classical music lounges.",
    similarityScore: 89
  }
]
