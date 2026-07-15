// Client Bookings Page
import { useEffect, useState } from 'react';
import { FiCalendar, FiSearch, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { bookingsApi, Booking } from '../../services/api';

const statusColor: Record<string, string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string, string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function ClientBookings() {
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

  const filtered = bookings.filter(b => b.destination.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl flex-1 shadow-sm">
          <FiSearch className="text-gray-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar reservas..." className="flex-1 outline-none text-dark bg-transparent text-sm" />
        </div>
      </div>

      {loading && (
        <div className="card p-10 flex items-center justify-center gap-2 text-gray-500">
          <FiLoader className="animate-spin" /> A carregar reservas...
        </div>
      )}

      {!loading && error && (
        <div className="card p-10 flex items-center justify-center gap-2 text-red-500">
          <FiAlertCircle /> {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="card p-10 text-center text-gray-500">
          Ainda não tens nenhuma reserva. Explora os destinos e reserva a tua primeira aventura!
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr><th>Destino</th><th>Data</th><th>Operador</th><th>Preço</th><th>Pessoas</th><th>Pontos</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td className="font-semibold text-dark">{b.destination}</td>
                  <td className="flex items-center gap-1 text-gray-500"><FiCalendar size={13}/>{b.date}</td>
                  <td className="text-gray-600">{b.operator || '—'}</td>
                  <td className="font-bold text-primary">{formatKz(b.amount)}</td>
                  <td className="text-gray-600">{b.people}</td>
                  <td className="text-xs">
                    {b.pointsEarned > 0 && <span className="text-green-600 font-semibold">+{b.pointsEarned} pts</span>}
                    {b.pointsRedeemed > 0 && <span className="text-gray-400"> -{b.pointsRedeemed} pts usados</span>}
                    {b.pointsEarned === 0 && b.pointsRedeemed === 0 && <span className="text-gray-300">—</span>}
                  </td>
                  <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
