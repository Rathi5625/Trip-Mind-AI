import { mockDestinations } from './destinations';

export interface Trip {
  id: string;
  userId: string;
  title: string;
  destinationId: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'upcoming' | 'completed' | 'cancelled' | 'archived';
  travelers: {
    adults: number;
    children: number;
  };
  budget: {
    total: number;
    currency: string;
  };
  imageUrl: string;
  createdAt: string;
}

export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    userId: 'usr-12345',
    title: 'Spring in Kyoto',
    destinationId: 'dest-1',
    destinationName: 'Kyoto, Japan',
    startDate: '2027-04-10T00:00:00Z',
    endDate: '2027-04-17T00:00:00Z',
    status: 'upcoming',
    travelers: { adults: 2, children: 0 },
    budget: { total: 3500, currency: 'USD' },
    imageUrl: mockDestinations[0].imageUrl,
    createdAt: '2026-10-15T12:00:00Z'
  },
  {
    id: 'trip-2',
    userId: 'usr-12345',
    title: 'Summer Getaway',
    destinationId: 'dest-2',
    destinationName: 'Santorini, Greece',
    startDate: '2026-08-01T00:00:00Z',
    endDate: '2026-08-10T00:00:00Z',
    status: 'completed',
    travelers: { adults: 2, children: 2 },
    budget: { total: 5500, currency: 'USD' },
    imageUrl: mockDestinations[1].imageUrl,
    createdAt: '2026-02-10T08:30:00Z'
  },
  {
    id: 'trip-3',
    userId: 'usr-12345',
    title: 'Bali Retreat (Draft)',
    destinationId: 'dest-3',
    destinationName: 'Bali, Indonesia',
    startDate: '2027-11-05T00:00:00Z',
    endDate: '2027-11-12T00:00:00Z',
    status: 'draft',
    travelers: { adults: 1, children: 0 },
    budget: { total: 1200, currency: 'USD' },
    imageUrl: mockDestinations[2].imageUrl,
    createdAt: '2026-06-25T14:45:00Z'
  }
];
