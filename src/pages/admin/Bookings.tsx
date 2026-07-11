import { useEffect, useState } from 'react';
import { FiSearch, FiCalendar, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { bookingsApi, Booking } from '../../services/api';

const statusColor: Record<string,string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string,string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function AdminBookings() {
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    bookingsApi.getAll()
      .then(res => setBookings(res.data))
      .catch(err => setError(err.message || 'Não foi possível carregar as reservas.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => b.clientName.toLowerCase().includes(search.toLowerCase()) || b.destination.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar reservas..." className="flex-1 outline-none text-dark bg-transparent text-sm"/>
      </div>

      {error && <p className="text-sm text-red-500 flex items-center gap-2"><FiAlertCircle/> {error}</p>}

      {loading ? (
        <div className="card p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar reservas...</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Cliente</th><th>Operador</th><th>Destino</th><th>Data</th><th>Montante</th><th>Estado</th></tr></thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td className="font-mono text-xs text-gray-400">#K{String(b.id).padStart(3,'0')}</td>
                  <td className="font-semibold text-dark">{b.clientName}</td>
                  <td className="text-gray-500 text-xs">{b.operator || '—'}</td>
                  <td className="text-gray-600">{b.destination}</td>
                  <td className="flex items-center gap-1 text-gray-500 text-xs"><FiCalendar size={11}/>{b.date}</td>
                  <td className="font-bold text-primary">{formatKz(b.amount)}</td>
                  <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-400 py-8">Nenhuma reserva encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
