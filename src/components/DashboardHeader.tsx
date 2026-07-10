import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiSearch, FiArrowLeft } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';

interface Props {
  onMenuClick: () => void;
  title: string;
  showBack?: boolean;
}

export default function DashboardHeader({ onMenuClick, title, showBack = true }: Props) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-3 shadow-sm">
      {/* Mobile menu toggle */}
      <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
        <FiMenu size={20} />
      </button>

      {/* Title */}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-dark font-heading">{title}</h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 w-56">
        <FiSearch size={16} className="text-gray-400" />
        <input placeholder="Pesquisar..." className="bg-transparent text-sm outline-none flex-1 text-dark placeholder-gray-400" />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
        <FiBell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer shrink-0">
        {user?.avatar || user?.name?.[0]}
      </div>
    </header>
  );
}
