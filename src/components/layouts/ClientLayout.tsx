import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiCalendar, FiHeart, FiUser } from 'react-icons/fi';
import DashboardSidebar from '../DashboardSidebar';
import DashboardHeader from '../DashboardHeader';

const navItems = [
  { name: 'Dashboard',      path: '/cliente',           icon: <FiHome size={18} /> },
  { name: 'Minhas Reservas',path: '/cliente/reservas',  icon: <FiCalendar size={18} /> },
  { name: 'Favoritos',      path: '/cliente/favoritos', icon: <FiHeart size={18} /> },
  { name: 'Meu Perfil',     path: '/cliente/perfil',    icon: <FiUser size={18} /> },
];

const pageTitles: Record<string, string> = {
  '/cliente': 'Dashboard',
  '/cliente/reservas': 'Minhas Reservas',
  '/cliente/favoritos': 'Favoritos',
  '/cliente/perfil': 'Meu Perfil',
};

export default function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar title="Kutandisa" navItems={navItems} isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} accentColor="gradient-primary" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} title={pageTitles[pathname] || 'Área Cliente'} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
