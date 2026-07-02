export interface Place {
  id: string;
  destinationId: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'attraction' | 'hidden-gem';
  rating: number;
  reviews: number;
  priceLevel: 1 | 2 | 3 | 4; // 1 = $, 4 = $$$$
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
}

export const mockPlaces: Place[] = [
  {
    id: 'place-1',
    destinationId: 'dest-1',
    name: 'Ritz-Carlton Kyoto',
    type: 'hotel',
    rating: 4.9,
    reviews: 1250,
    priceLevel: 4,
    description: 'Luxury hotel on the banks of the Kamogawa river, offering stunning views and impeccable service.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14d2a93?auto=format&fit=crop&q=80',
    coordinates: { lat: 35.0135, lng: 135.7712 },
    tags: ['Luxury', 'River View', 'Spa']
  },
  {
    id: 'place-2',
    destinationId: 'dest-1',
    name: 'Kikunoi Honten',
    type: 'restaurant',
    rating: 4.8,
    reviews: 840,
    priceLevel: 4,
    description: 'Three Michelin star kaiseki restaurant offering the ultimate traditional dining experience.',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80',
    coordinates: { lat: 35.0021, lng: 135.7794 },
    tags: ['Kaiseki', 'Michelin Star', 'Traditional']
  },
  {
    id: 'place-3',
    destinationId: 'dest-1',
    name: 'Otagi Nenbutsu-ji',
    type: 'hidden-gem',
    rating: 4.7,
    reviews: 320,
    priceLevel: 1,
    description: 'A whimsical temple covered in over 1,200 unique stone statues representing the disciples of Buddha.',
    imageUrl: 'https://images.unsplash.com/photo-1624838612980-8b1b50c0576f?auto=format&fit=crop&q=80',
    coordinates: { lat: 35.0298, lng: 135.6663 },
    tags: ['Temple', 'Quiet', 'Sculpture', 'Photography']
  }
];
