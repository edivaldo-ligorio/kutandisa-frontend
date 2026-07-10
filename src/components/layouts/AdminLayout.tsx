import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiUserCheck, FiBookOpen, FiCreditCard } from 'react-icons/fi';
import DashboardSidebar from '../DashboardSidebar';
import DashboardHeader from '../DashboardHeader';

const navItems = [
  { name: 'Dashboard',    path: '/admin',               icon: <FiGrid size={18} /> },
  { name: 'Utilizadores', path: '/admin/utilizadores',  icon: <FiUsers size={18} /> },
  { name: 'Operadores',   path: '/admin/operadores',    icon: <FiUserCheck size={18} /> },
  { name: 'Reservas',     path: '/admin/reservas',      icon: <FiBookOpen size={18} /> },
  { name: 'Pagamentos',   path: '/admin/pagamentos',    icon: <FiCreditCard size={18} /> },
];

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard Admin',
  '/admin/utilizadores': 'Utilizadores',
  '/admin/operadores': 'Operadores',
  '/admin/reservas': 'Reservas',
  '/admin/pagamentos': 'Pagamentos',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar title="Admin Kutandisa" navItems={navItems} isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} accentColor="bg-red-600" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} title={pageTitles[pathname] || 'Admin'} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
