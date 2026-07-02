import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken?: string | null) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user, token, refreshToken = null) => 
        set({ user, token, refreshToken, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      }))
    }),
    {
      name: 'auth-storage',
    }
  )
);
