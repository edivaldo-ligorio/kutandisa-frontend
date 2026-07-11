import { useEffect, useState } from 'react';
import { FiTrendingUp, FiArrowDownLeft, FiCreditCard, FiLoader, FiAlertCircle } from 'react-icons/fi';
import StatsCard from '../../components/StatsCard';
import { paymentsApi, Payment, Stats } from '../../services/api';

const statusColor: Record<string,string> = { completed:'badge-green', pending:'badge-yellow', failed:'badge-red' };
const statusLabel: Record<string,string> = { completed:'Concluído', pending:'Pendente', failed:'Falhou' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([paymentsApi.getAll(), paymentsApi.getStats()])
      .then(([p, s]) => { setPayments(p.data); setStats(s); })
      .catch(err => setError(err.message || 'Não foi possível carregar os pagamentos.'))
      .finally(() => setLoading(false));
  }, []);

  const completedTotal = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {error && <p className="text-sm text-red-500 flex items-center gap-2"><FiAlertCircle/> {error}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Receita Total" value={stats ? formatKz(stats.totalRevenue) : '—'} icon={<FiCreditCard size={20}/>} change={`${stats?.totalBookings ?? 0} reservas`}/>
        <StatsCard title="Pagamentos Concluídos" value={formatKz(completedTotal)} icon={<FiTrendingUp size={20}/>} change={`${payments.filter(p=>p.status==='completed').length} pagamentos`}/>
        <StatsCard title="Pendente" value={formatKz(pendingTotal)} icon={<FiArrowDownLeft size={20}/>} change="por confirmar" changePositive={false}/>
        <StatsCard title="Reservas Confirmadas" value={String(stats?.confirmedBookings ?? 0)} icon={<FiCreditCard size={20}/>} change={`${stats?.pendingBookings ?? 0} pendentes`}/>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-dark font-heading">Histórico de Pagamentos</h3>
        </div>
        {loading ? (
          <div className="p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar...</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>ID</th><th>Cliente</th><th>Método</th><th>Data</th><th>Montante</th><th>Estado</th></tr></thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td className="font-mono text-xs text-gray-400">#P{String(p.id).padStart(3,'0')}</td>
                  <td className="font-semibold text-dark text-sm">{p.clientName}</td>
                  <td className="text-gray-500 text-xs">{p.method}</td>
                  <td className="text-gray-400 text-xs">{p.date}</td>
                  <td className="font-bold text-sm text-green-600">+{formatKz(p.amount)}</td>
                  <td><span className={`badge text-xs ${statusColor[p.status] || 'badge-yellow'}`}>{statusLabel[p.status] || p.status}</span></td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">Nenhum pagamento registado.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
