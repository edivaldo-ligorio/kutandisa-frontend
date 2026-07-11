import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';

interface Props {
  onMenuClick: () => void;
  title: string;
  showBack?: boolean;
}

export default function DashboardHeader({ onMenuClick, title }: Props) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/destinos?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-3 shadow-sm relative">
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
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Pesquisar destinos..."
          className="bg-transparent text-sm outline-none flex-1 text-dark placeholder-gray-400"
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(v => !v)}
          className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <FiBell size={20} />
        </button>
        {showNotifications && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
            <div className="absolute right-0 top-12 w-72 bg-white border border-gray-100 rounded-xl shadow-lg z-20 p-4">
              <p className="font-semibold text-dark text-sm mb-1">Notificações</p>
              <p className="text-xs text-gray-400">Sem notificações novas por agora.</p>
            </div>
          </>
        )}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer shrink-0">
        {user?.avatar || user?.name?.[0]}
      </div>
    </header>
  );
}
