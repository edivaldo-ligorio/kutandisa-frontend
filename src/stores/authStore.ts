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
  logout: () => void;
  restoreSession: () => Promise<void>;
  // Mantido para demo rápido (sem backend)
  switchRole: (role: UserRole) => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  guest:    { id: 0, name: 'Visitante',       email: '',                    role: 'guest',    status: 'active', joined: '', bookings: 0 },
  client:   { id: 1, name: 'Maria João',      email: 'maria@kutandisa.ao', role: 'client',   status: 'active', joined: '2026-01-15', bookings: 8,  avatar: 'MJ' },
  operator: { id: 7, name: 'Hotel Luanda',    email: 'hotel@kutandisa.ao', role: 'operator', status: 'active', joined: '2025-06-15', bookings: 0,  avatar: 'HL' },
  admin:    { id: 6, name: 'Admin Kutandisa', email: 'admin@kutandisa.ao', role: 'admin',    status: 'active', joined: '2025-01-01', bookings: 0,  avatar: 'AK' },
};

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

  // Demo: troca de role sem password (mantém compatibilidade)
  switchRole: (role) => {
    if (role === 'guest') {
      clearToken();
      set({ user: null, role: 'guest', isAuthenticated: false });
    } else {
      set({ user: DEMO_USERS[role], role, isAuthenticated: true });
    }
  },
}));
