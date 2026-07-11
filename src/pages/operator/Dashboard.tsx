import { useEffect, useState } from 'react';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiStar, FiArrowRight, FiLoader } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import StatsCard from '../../components/StatsCard';
import { bookingsApi, Booking } from '../../services/api';

// Dados ilustrativos: sem endpoint de série temporal de receita no backend ainda.
const revenueData = [
  { month:'Jan', receita:120000 }, { month:'Fev', receita:150000 }, { month:'Mar', receita:180000 },
  { month:'Abr', receita:220000 }, { month:'Mai', receita:250000 }, { month:'Jun', receita:310000 },
];

const statusColor: Record<string, string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string, string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function OperatorDashboard() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsApi.getAll().then(res => setBookings(res.data)).finally(() => setLoading(false));
  }, []);

  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const recent = [...bookings].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-secondary to-yellow-400 rounded-2xl p-8 text-dark relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full" />
        <p className="text-dark/70 text-sm mb-1">Painel do Operador</p>
        <h2 className="text-3xl font-black font-heading mb-2">{user?.name}</h2>
        <p className="text-dark/70 mb-6">Gestão dos seus serviços turísticos</p>
        <Link to="/operador/servicos" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-bold rounded-full text-sm hover:shadow-lg transition-all">
          Gerir Serviços <FiArrowRight size={16}/>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Serviços Activos"     value="12" icon={<FiBriefcase size={20}/>} change="dados de exemplo" changePositive={false} />
        <StatsCard title="Reservas Pendentes"   value={loading ? '—' : String(pending)}  icon={<FiCalendar size={20}/>} changePositive={false} />
        <StatsCard title="Reservas Confirmadas" value={loading ? '—' : String(confirmed)} icon={<FiCheckCircle size={20}/>} />
        <StatsCard title="Avaliação Média"      value="4.8★" icon={<FiStar size={20}/>} change="dados de exemplo" changePositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-dark font-heading">Receita Mensal (Kz)</h3>
            <span className="badge-yellow text-xs">dados de exemplo</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{fontSize:12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`} />
              <Tooltip formatter={(v:number) => [`${v.toLocaleString()} Kz`, 'Receita']} />
              <Bar dataKey="receita" fill="#1D6A5A" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Plan & Rating */}
        <div className="space-y-4">
          <div className="card p-6">
            <h4 className="font-bold text-dark mb-4">Avaliações Recentes</h4>
            <div className="text-center">
              <div className="text-4xl font-black text-secondary mb-1">4.8</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_,i)=><FiStar key={i} size={16} className="text-secondary fill-secondary"/>)}
              </div>
              <p className="text-xs text-gray-500">dados de exemplo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-dark font-heading">Reservas Recentes</h3>
          <Link to="/operador/reservas" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">Ver todas <FiArrowRight size={14}/></Link>
        </div>
        {loading ? (
          <div className="p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar...</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Cliente</th><th>Destino</th><th>Data</th><th>Montante</th><th>Estado</th></tr></thead>
            <tbody>
              {recent.map(b => (
                <tr key={b.id}>
                  <td className="font-semibold text-dark">{b.clientName}</td>
                  <td className="text-gray-600">{b.destination}</td>
                  <td className="text-gray-500">{b.date}</td>
                  <td className="font-bold text-primary">{formatKz(b.amount)}</td>
                  <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-400 py-8">Sem reservas ainda.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
