import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';
import type { UserRole } from '../stores/authStore';

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Destinos', path: '/destinos' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Contactos', path: '/contactos' },
];

const rolePaths: Record<string, string> = {
  client: '/cliente',
  operator: '/operador',
  admin: '/admin',
};

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); setDropdownOpen(false); navigate('/'); };
  const goToDashboard = () => { navigate(rolePaths[role] || '/'); setDropdownOpen(false); };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <span className="text-white font-black text-lg">K</span>
          </div>
          <span className={`text-2xl font-black font-heading transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}>
            Kutandisa
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path}
              className={({ isActive }) => `text-sm font-semibold transition-colors ${
                isActive
                  ? 'text-secondary'
                  : scrolled ? 'text-dark hover:text-primary' : 'text-white/90 hover:text-white'
              }`}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Auth area */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  scrolled ? 'bg-accent text-primary hover:bg-primary hover:text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user?.avatar || user?.name?.[0]}
                </div>
                <span>{user?.name}</span>
                <FiChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-cardHover border border-gray-100 py-2 z-50">
                    <button onClick={goToDashboard} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-dark hover:bg-accent transition-colors">
                      <FiUser size={15} /> Meu Painel
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <FiLogOut size={15} /> Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/entrar" className={`text-sm font-semibold px-5 py-2 rounded-full border-2 transition-all ${
                scrolled ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white text-white hover:bg-white hover:text-dark'
              }`}>Entrar</Link>
              <Link to="/entrar?mode=register" className="text-sm font-semibold px-5 py-2 rounded-full bg-secondary text-dark hover:bg-secondary-dark transition-all shadow-md hover:shadow-lg">
                Registar
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-dark' : 'text-white'}`}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <NavLink key={link.path} to={link.path} onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `block py-3 text-sm font-semibold ${isActive ? 'text-primary' : 'text-dark'}`}>
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => { goToDashboard(); setMenuOpen(false); }} className="btn-primary justify-center">Meu Painel</button>
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-ghost justify-center text-red-500">Sair</button>
                  </>
                ) : (
                  <>
                    <Link to="/entrar" onClick={() => setMenuOpen(false)} className="btn-outline justify-center">Entrar</Link>
                    <Link to="/entrar?mode=register" onClick={() => setMenuOpen(false)} className="btn-secondary justify-center">Registar</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
