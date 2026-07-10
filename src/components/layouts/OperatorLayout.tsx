import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiCalendar, FiUser } from 'react-icons/fi';
import DashboardSidebar from '../DashboardSidebar';
import DashboardHeader from '../DashboardHeader';

const navItems = [
  { name: 'Dashboard',       path: '/operador',          icon: <FiHome size={18} /> },
  { name: 'Meus Serviços',   path: '/operador/servicos', icon: <FiBriefcase size={18} /> },
  { name: 'Reservas',        path: '/operador/reservas', icon: <FiCalendar size={18} /> },
  { name: 'Perfil Comercial',path: '/operador/perfil',   icon: <FiUser size={18} /> },
];

const pageTitles: Record<string, string> = {
  '/operador': 'Dashboard Operador',
  '/operador/servicos': 'Meus Serviços',
  '/operador/reservas': 'Reservas',
  '/operador/perfil': 'Perfil Comercial',
};

export default function OperatorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar title="Operador" navItems={navItems} isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} accentColor="bg-secondary" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} title={pageTitles[pathname] || 'Área Operador'} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
