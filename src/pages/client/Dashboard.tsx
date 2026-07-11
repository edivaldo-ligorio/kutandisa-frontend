import { useEffect, useState } from 'react';
import { FiCalendar, FiHeart, FiMapPin, FiStar, FiArrowRight, FiClock, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import StatsCard from '../../components/StatsCard';
import { bookingsApi, destinationsApi, favouritesApi, Booking, Destination } from '../../services/api';

const statusColors: Record<string, string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabels: Record<string, string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

export default function ClientDashboard() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([bookingsApi.getAll(), destinationsApi.getAll(), favouritesApi.getAll()])
      .then(([b, d, f]) => {
        setBookings(b.data);
        // sugestões: destinos com melhor avaliação que o cliente ainda não reservou
        const bookedIds = new Set(b.data.map(x => x.destinationId));
        setSuggestions(
          [...d.data]
            .filter(x => !bookedIds.has(x.id))
            .sort((a, c) => c.rating - a.rating)
            .slice(0, 3)
        );
        setFavouritesCount(f.total);
      })
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter(b => b.status !== 'cancelled').slice(0, 3);
  const visitedCount = new Set(bookings.filter(b => b.status === 'confirmed').map(b => b.destinationId)).size;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-1">Bem-vindo de volta,</p>
          <h2 className="text-3xl font-black font-heading mb-2">{user?.name}</h2>
          <p className="text-white/80 mb-6">Pronto para a próxima aventura?</p>
          <Link to="/destinos" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-full text-sm hover:shadow-lg transition-all">
            Explorar Destinos <FiArrowRight size={16}/>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Reservas Activas" value={String(bookings.filter(b=>b.status!=='cancelled').length)} icon={<FiCalendar size={20}/>} />
        <StatsCard title="Destinos Visitados" value={String(visitedCount)} icon={<FiMapPin size={20}/>} />
        <StatsCard title="Favoritos" value={String(favouritesCount)} icon={<FiHeart size={20}/>} />
        <StatsCard title="Avaliações Feitas" value="0" icon={<FiStar size={20}/>} change="em breve" changePositive={false} />
      </div>

      {/* Upcoming Bookings */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-dark font-heading">Próximas Reservas</h3>
          <Link to="/cliente/reservas" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            Ver todas <FiArrowRight size={14}/>
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500 py-8"><FiLoader className="animate-spin"/> A carregar...</div>
        ) : upcoming.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Ainda não tens reservas. <Link to="/destinos" className="text-primary font-semibold hover:underline">Explora destinos</Link></p>
        ) : (
          <div className="space-y-4">
            {upcoming.map(b => (
              <Link key={b.id} to={`/destinos/${b.destinationId}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-accent transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark">{b.destination}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><FiCalendar size={11}/>{b.date}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><FiClock size={11}/>{b.people} pessoa{b.people>1?'s':''}</span>
                  </div>
                </div>
                <span className={`badge text-xs ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-dark font-heading">Sugestões para Ti</h3>
          <Link to="/destinos" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">Ver mais <FiArrowRight size={14}/></Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500 py-8"><FiLoader className="animate-spin"/> A carregar...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map(s => (
              <Link key={s.id} to={`/destinos/${s.id}`} className="card card-hover group overflow-hidden cursor-pointer block">
                <div className="h-36 overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="badge-primary text-xs mb-2 inline-block">{s.category}</span>
                  <h4 className="font-bold text-dark text-sm mb-1">{s.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1"><FiStar size={12} className="text-secondary fill-secondary"/><span className="text-xs text-gray-600">{s.rating}</span></div>
                    <span className="text-primary text-xs font-bold">{s.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
