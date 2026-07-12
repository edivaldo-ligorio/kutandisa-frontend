import { create } from 'zustand';
import { authApi, setToken, clearToken, getToken, type User } from '../services/api';

export type UserRole = 'guest' | 'client' | 'operator' | 'admin';

interface AuthState {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Autenticação real via API
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  registerWithCredentials: (name: string, email: string, password: string, role: 'client' | 'operator') => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: 'guest',
  isAuthenticated: false,
  isLoading: false,

  loginWithCredentials: async (email, password) => {
    set({ isLoading: true });
    try {
      const { token, user } = await authApi.login(email, password);
      setToken(token);
      set({ user, role: user.role, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  registerWithCredentials: async (name, email, password, role) => {
    set({ isLoading: true });
    try {
      const { token, user } = await authApi.register(name, email, password, role);
      setToken(token);
      set({ user, role: user.role, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    clearToken();
    set({ user: null, role: 'guest', isAuthenticated: false });
  },

  restoreSession: async () => {
    const token = getToken();
    if (!token) return;
    try {
      const user = await authApi.me();
      set({ user, role: user.role, isAuthenticated: true });
    } catch {
      clearToken();
    }
  },
}));
