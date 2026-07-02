export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  preferences: {
    currency: string;
    language: string;
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      tripAlerts: boolean;
    };
  };
  travelDNA: {
    primaryType: string;
    budgetPreference: 'Budget' | 'Mid-range' | 'Luxury';
    favoriteCategories: string[];
  };
}

export const mockUser: User = {
  id: 'usr-12345',
  name: 'Alex Traveler',
  email: 'alex@tripmind.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
  preferences: {
    currency: 'USD',
    language: 'en-US',
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      tripAlerts: true
    }
  },
  travelDNA: {
    primaryType: 'Cultural Explorer',
    budgetPreference: 'Mid-range',
    favoriteCategories: ['History', 'Food', 'Architecture', 'Nature']
  }
};
