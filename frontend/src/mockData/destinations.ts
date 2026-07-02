export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  matchScore: number;
  budgetCategory: 'Budget' | 'Mid-range' | 'Luxury';
  estimatedCost: number;
  weather: {
    temp: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Snowy';
  };
  crowdLevel: 'Low' | 'Moderate' | 'High';
  tags: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const mockDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Experience ancient temples, traditional tea houses, and sublime gardens in Japan\'s cultural capital.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80',
    matchScore: 98,
    budgetCategory: 'Mid-range',
    estimatedCost: 1500,
    weather: { temp: 22, condition: 'Sunny' },
    crowdLevel: 'Moderate',
    tags: ['Culture', 'Food', 'Temples', 'History'],
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: 'dest-2',
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic white-washed buildings, stunning sunsets, and crystal-clear waters in the Aegean Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f1?auto=format&fit=crop&q=80',
    matchScore: 95,
    budgetCategory: 'Luxury',
    estimatedCost: 3200,
    weather: { temp: 28, condition: 'Sunny' },
    crowdLevel: 'High',
    tags: ['Romance', 'Beaches', 'Luxury', 'Views'],
    coordinates: { lat: 36.3932, lng: 25.4615 }
  },
  {
    id: 'dest-3',
    name: 'Bali',
    country: 'Indonesia',
    description: 'A tropical paradise offering lush rice terraces, ancient temples, and vibrant beach clubs.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80',
    matchScore: 92,
    budgetCategory: 'Budget',
    estimatedCost: 800,
    weather: { temp: 30, condition: 'Sunny' },
    crowdLevel: 'High',
    tags: ['Beaches', 'Culture', 'Nature', 'Wellness'],
    coordinates: { lat: -8.4095, lng: 115.1889 }
  },
  {
    id: 'dest-4',
    name: 'Reykjavik',
    country: 'Iceland',
    description: 'Gateway to stunning waterfalls, geysers, and the magical Northern Lights.',
    imageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80',
    matchScore: 88,
    budgetCategory: 'Luxury',
    estimatedCost: 2800,
    weather: { temp: 8, condition: 'Cloudy' },
    crowdLevel: 'Low',
    tags: ['Nature', 'Adventure', 'Cold', 'Scenery'],
    coordinates: { lat: 64.1466, lng: -21.9426 }
  },
  {
    id: 'dest-5',
    name: 'Cape Town',
    country: 'South Africa',
    description: 'Breathtaking landscapes, world-class wine tasting, and diverse wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80',
    matchScore: 90,
    budgetCategory: 'Mid-range',
    estimatedCost: 1800,
    weather: { temp: 24, condition: 'Sunny' },
    crowdLevel: 'Moderate',
    tags: ['Adventure', 'Nature', 'Wine', 'Safari'],
    coordinates: { lat: -33.9249, lng: 18.4241 }
  }
];
