import { FiCalendar, FiHeart, FiMapPin, FiStar, FiArrowRight, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import StatsCard from '../../components/StatsCard';

const upcomingBookings = [
  { id:1, destination:'Kalandula Falls', date:'15 Mar 2026', time:'09:00', status:'confirmed', image:'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=300&q=80' },
  { id:2, destination:'Hotel Luanda',    date:'22 Mar 2026', time:'14:00', status:'pending',   image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80' },
];

const suggestions = [
  { id:1, name:'Ilha do Mussulo', category:'Praia',    rating:4.7, price:'30.000–90.000 Kz', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80' },
  { id:2, name:'Parque do Iona',  category:'Natureza', rating:4.6, price:'50.000–150.000 Kz',image:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&q=80' },
  { id:3, name:'Pungo Andongo',   category:'História', rating:4.7, price:'35.000–90.000 Kz', image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80' },
];

const statusColors: Record<string, string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabels: Record<string, string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

export default function ClientDashboard() {
  const { user } = useAuthStore();

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
        <StatsCard title="Reservas Activas" value="3"  icon={<FiCalendar size={20}/>} change="+1 este mês" />
        <StatsCard title="Destinos Visitados" value="8" icon={<FiMapPin size={20}/>} change="+2 este ano" />
        <StatsCard title="Favoritos"          value="12" icon={<FiHeart size={20}/>} />
        <StatsCard title="Avaliações Feitas"  value="6"  icon={<FiStar size={20}/>} />
      </div>

      {/* Upcoming Bookings */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-dark font-heading">Próximas Reservas</h3>
          <Link to="/cliente/reservas" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            Ver todas <FiArrowRight size={14}/>
          </Link>
        </div>
        <div className="space-y-4">
          {upcomingBookings.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-accent transition-colors">
              <img src={b.image} alt={b.destination} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark">{b.destination}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1"><FiCalendar size={11}/>{b.date}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><FiClock size={11}/>{b.time}</span>
                </div>
              </div>
              <span className={`badge text-xs ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-dark font-heading">Sugestões para Ti</h3>
          <Link to="/destinos" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">Ver mais <FiArrowRight size={14}/></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map(s => (
            <div key={s.id} className="card card-hover group overflow-hidden cursor-pointer">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
