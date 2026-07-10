import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiX } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';

interface NavItem { name: string; path: string; icon: React.ReactNode; }

interface Props {
  title: string;
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}

export default function DashboardSidebar({ title, navItems, isOpen, onClose, accentColor = 'bg-primary' }: Props) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onClose} />
        )}
      </AnimatePresence>

      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 flex flex-col
        bg-dark-sidebar shadow-sidebar transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${accentColor} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-white font-bold text-sm">{title}</span>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${accentColor} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
              {user?.avatar || user?.name?.[0]}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name}</p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path.endsWith('*') ? false : true}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <FiLogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
