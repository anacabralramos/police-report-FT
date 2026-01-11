import { create } from "zustand";

interface User {
  id: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Começa deslogado
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
