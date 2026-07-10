import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { useAuthStore } from './stores/authStore';
import './index.css';

const queryClient = new QueryClient();

// Restaurar sessão JWT ao carregar a app
useAuthStore.getState().restoreSession();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
