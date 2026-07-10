// src/services/api.ts
// Cliente HTTP centralizado para comunicação com o backend

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ── Token helpers ─────────────────────────────────────────────
export const getToken = () => localStorage.getItem('kutandisa_token');
export const setToken = (t: string) => localStorage.setItem('kutandisa_token', t);
export const clearToken = () => localStorage.removeItem('kutandisa_token');

// ── Base fetch ────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; user: User; message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string, role?: string) =>
    apiFetch<{ token: string; user: User; message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    }),

  me: () => apiFetch<User>('/auth/me'),
};

// ── Destinations ──────────────────────────────────────────────
export const destinationsApi = {
  getAll: (params?: { province?: string; category?: string; search?: string }) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return apiFetch<{ data: Destination[]; total: number }>(`/destinations${q}`);
  },
  getById: (id: number) =>
    apiFetch<Destination>(`/destinations/${id}`),
};

// ── Bookings ──────────────────────────────────────────────────
export const bookingsApi = {
  getAll: (status?: string) => {
    const q = status ? `?status=${status}` : '';
    return apiFetch<{ data: Booking[]; total: number }>(`/bookings${q}`);
  },
  create: (data: Partial<Booking>) =>
    apiFetch<Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: number, status: string) =>
    apiFetch<{ booking: Booking }>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ── Users ─────────────────────────────────────────────────────
export const usersApi = {
  getAll: (params?: { search?: string; status?: string; role?: string }) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return apiFetch<{ data: User[]; total: number }>(`/users${q}`);
  },
  updateStatus: (id: number, status: string) =>
    apiFetch<{ user: User }>(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  delete: (id: number) =>
    apiFetch<{ message: string }>(`/users/${id}`, { method: 'DELETE' }),
};

// ── Operators ─────────────────────────────────────────────────
export const operatorsApi = {
  getAll: () => apiFetch<{ data: Operator[]; total: number }>('/operators'),
  updateStatus: (id: number, status: string) =>
    apiFetch<{ operator: Operator }>(`/operators/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ── Payments ─────────────────────────────────────────────────
export const paymentsApi = {
  getAll: () => apiFetch<{ data: Payment[]; total: number }>('/payments'),
  getStats: () => apiFetch<Stats>('/payments/stats'),
};

// ── Types ─────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'guest' | 'client' | 'operator' | 'admin';
  status: string;
  joined: string;
  bookings: number;
  avatar?: string;
}

export interface Destination {
  id: number;
  name: string;
  province: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  images?: string[];
  description: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  difficulty: string;
}

export interface Booking {
  id: number;
  clientId: number;
  clientName: string;
  destinationId: number;
  destination: string;
  operatorId: number;
  operator: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  amount: number;
  people: number;
}

export interface Operator {
  id: number;
  name: string;
  email: string;
  category: string;
  status: string;
  services: number;
  rating: number;
  joined: string;
  revenue: number;
}

export interface Payment {
  id: number;
  bookingId: number;
  clientName: string;
  amount: number;
  method: string;
  status: string;
  date: string;
}

export interface Stats {
  totalUsers: number;
  totalOperators: number;
  totalBookings: number;
  totalRevenue: number;
  confirmedBookings: number;
  pendingBookings: number;
}
