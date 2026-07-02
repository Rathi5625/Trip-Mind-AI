export interface ItineraryDay {
  day: number;
  date: string;
  activities: {
    id: string;
    time: string;
    title: string;
    description: string;
    type: 'activity' | 'dining' | 'transit' | 'accommodation';
    cost: number;
    placeId?: string;
  }[];
}

export interface Itinerary {
  id: string;
  tripId: string;
  destinationId: string;
  days: ItineraryDay[];
}

export const mockItineraries: Itinerary[] = [
  {
    id: 'itin-1',
    tripId: 'trip-1',
    destinationId: 'dest-1',
    days: [
      {
        day: 1,
        date: '2027-04-10',
        activities: [
          {
            id: 'act-1',
            time: '09:00',
            title: 'Arrive in Kyoto',
            description: 'Check into Ritz-Carlton Kyoto and freshen up.',
            type: 'accommodation',
            cost: 0,
            placeId: 'place-1'
          },
          {
            id: 'act-2',
            time: '12:30',
            title: 'Lunch at Kikunoi Honten',
            description: 'Experience traditional kaiseki dining.',
            type: 'dining',
            cost: 250,
            placeId: 'place-2'
          },
          {
            id: 'act-3',
            time: '15:00',
            title: 'Otagi Nenbutsu-ji Temple',
            description: 'Explore the whimsical stone statues.',
            type: 'activity',
            cost: 15,
            placeId: 'place-3'
          }
        ]
      }
    ]
  }
];
