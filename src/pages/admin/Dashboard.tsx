import { FiUsers, FiUserCheck, FiBookOpen, FiCreditCard, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import StatsCard from '../../components/StatsCard';

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

const recentUsers = [
  { id:1, name:'Ana Rodrigues',  email:'ana@email.com',   role:'Cliente',   status:'active',   joined:'15 Mar 2026' },
  { id:2, name:'Hotel Kilamba',  email:'kilamba@hotel.ao', role:'Operador',  status:'active',   joined:'14 Mar 2026' },
  { id:3, name:'Pedro Lopes',    email:'pedro@email.com',  role:'Cliente',   status:'inactive', joined:'13 Mar 2026' },
  { id:4, name:'Safari Co.',     email:'safari@ao.com',    role:'Operador',  status:'pending',  joined:'12 Mar 2026' },
];

const statusColor: Record<string,string> = { active:'badge-green', inactive:'badge-red', pending:'badge-yellow' };
const statusLabel: Record<string,string> = { active:'Activo', inactive:'Inactivo', pending:'Pendente' };

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Utilizadores" value="12.456" icon={<FiUsers size={20}/>}     change="+12.5% este mês" />
        <StatsCard title="Operadores Activos" value="892"    icon={<FiUserCheck size={20}/>} change="+8.3% este mês" />
        <StatsCard title="Reservas Este Mês"  value="3.241"  icon={<FiBookOpen size={20}/>}  change="+15.2% este mês" />
        <StatsCard title="Receita Total"      value="56,6M Kz"  icon={<FiCreditCard size={20}/>} change="+23.1% este mês" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-dark font-heading">Reservas & Receita Mensal</h3>
            <span className="badge-green text-xs flex items-center gap-1"><FiTrendingUp size={11}/>+23% YoY</span>
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
          <h3 className="font-bold text-dark font-heading mb-6">Categorias de Serviços</h3>
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
        <table className="data-table">
          <thead><tr><th>Nome</th><th>Email</th><th>Perfil</th><th>Registo</th><th>Estado</th></tr></thead>
          <tbody>
            {recentUsers.map(u => (
              <tr key={u.id}>
                <td className="font-semibold text-dark">{u.name}</td>
                <td className="text-gray-500 text-xs">{u.email}</td>
                <td><span className={`badge text-xs ${u.role==='Operador'?'badge-blue':'badge-primary'}`}>{u.role}</span></td>
                <td className="text-gray-500 text-xs">{u.joined}</td>
                <td><span className={`badge text-xs ${statusColor[u.status]}`}>{statusLabel[u.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
