import { useEffect, useState } from 'react';
import { FiUsers, FiUserCheck, FiBookOpen, FiCreditCard, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import StatsCard from '../../components/StatsCard';
import { paymentsApi, usersApi, Stats, User } from '../../services/api';

// Dados ilustrativos: o backend ainda não tem um endpoint de série temporal / categorias.
// Mantidos apenas como exemplo visual do gráfico — não refletem números reais.
const monthlyData = [
  { mes:'Jan', reservas:320, receita:48000 },
  { mes:'Fev', reservas:450, receita:67500 },
  { mes:'Mar', reservas:380, receita:57000 },
  { mes:'Abr', reservas:520, receita:78000 },
  { mes:'Mai', reservas:610, receita:91500 },
  { mes:'Jun', reservas:750, receita:112500 },
];
const pieData = [
  { name:'Alojamento', value:38, color:'#1D6A5A' },
  { name:'Restaurante', value:27, color:'#F5A623' },
  { name:'Pacotes',    value:22, color:'#3B82F6' },
  { name:'Transporte', value:13, color:'#8B5CF6' },
];

const statusColor: Record<string,string> = { active:'badge-green', inactive:'badge-yellow', suspended:'badge-red' };
const statusLabel: Record<string,string> = { active:'Activo', inactive:'Inactivo', suspended:'Bloqueado' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([paymentsApi.getStats(), usersApi.getAll()])
      .then(([s, u]) => { setStats(s); setRecentUsers(u.data.slice(-4).reverse()); })
      .catch(err => setError(err.message || 'Não foi possível carregar o dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {error && <p className="text-sm text-red-500 flex items-center gap-2"><FiAlertCircle/> {error}</p>}

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Clientes"      value={stats ? String(stats.totalUsers) : '—'}      icon={<FiUsers size={20}/>} />
        <StatsCard title="Operadores"          value={stats ? String(stats.totalOperators) : '—'}  icon={<FiUserCheck size={20}/>} />
        <StatsCard title="Total Reservas"      value={stats ? String(stats.totalBookings) : '—'}   icon={<FiBookOpen size={20}/>} change={stats ? `${stats.pendingBookings} pendentes` : undefined} changePositive={false} />
        <StatsCard title="Receita Total"       value={stats ? formatKz(stats.totalRevenue) : '—'}  icon={<FiCreditCard size={20}/>} change={stats ? `${stats.confirmedBookings} confirmadas` : undefined} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-dark font-heading">Reservas & Receita Mensal</h3>
            <span className="badge-yellow text-xs">dados de exemplo</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="mes" tick={{fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:12}} axisLine={false} tickLine={false}/>
              <Tooltip/>
              <Bar dataKey="reservas" fill="#1D6A5A" radius={[6,6,0,0]} name="Reservas"/>
              <Bar dataKey="receita"  fill="#F5A623" radius={[6,6,0,0]} name="Receita ($)"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-dark font-heading">Categorias de Serviços</h3>
          </div>
          <span className="badge-yellow text-xs mb-4 inline-block">dados de exemplo</span>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {pieData.map((e,i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {pieData.map((e,i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{background:e.color}}/>
                  <span className="text-gray-600">{e.name}</span>
                </div>
                <span className="font-bold text-dark">{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-dark font-heading">Utilizadores Recentes</h3>
          <Link to="/admin/utilizadores" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            Ver todos <FiArrowRight size={14}/>
          </Link>
        </div>
        {loading ? (
          <div className="p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar...</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Nome</th><th>Email</th><th>Perfil</th><th>Registo</th><th>Estado</th></tr></thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id}>
                  <td className="font-semibold text-dark">{u.name}</td>
                  <td className="text-gray-500 text-xs">{u.email}</td>
                  <td><span className={`badge text-xs ${u.role==='operator'?'badge-blue':'badge-primary'}`}>{u.role==='operator'?'Operador':'Cliente'}</span></td>
                  <td className="text-gray-500 text-xs">{u.joined}</td>
                  <td><span className={`badge text-xs ${statusColor[u.status] || 'badge-yellow'}`}>{statusLabel[u.status] || u.status}</span></td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-400 py-8">Sem utilizadores.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
