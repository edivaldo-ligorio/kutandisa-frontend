import { useEffect, useState } from 'react';
import { FiCalendar, FiCheck, FiX, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { bookingsApi, Booking } from '../../services/api';

const statusColor: Record<string,string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string,string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function OperatorBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    bookingsApi.getAll()
      .then(res => setBookings(res.data))
      .catch(err => setError(err.message || 'Não foi possível carregar as reservas.'))
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (b: Booking, status: string) => {
    setBusyId(b.id);
    try {
      const { booking } = await bookingsApi.updateStatus(b.id, status);
      setBookings(prev => prev.map(x => x.id === b.id ? booking : x));
    } catch (err: any) {
      setError(err.message || 'Não foi possível atualizar a reserva.');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <div className="card p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar reservas...</div>;
  }

  return (
    <div className="space-y-6">
      {error && <p className="text-sm text-red-500 flex items-center gap-2"><FiAlertCircle/> {error}</p>}

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Cliente</th><th>Destino</th><th>Data</th><th>Montante</th><th>Estado</th><th>Ações</th></tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td className="font-semibold text-dark">{b.clientName}</td>
                <td className="text-gray-600">{b.destination}</td>
                <td className="flex items-center gap-1 text-gray-500 text-sm"><FiCalendar size={12}/>{b.date}</td>
                <td className="font-bold text-primary">{formatKz(b.amount)}</td>
                <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                <td>
                  <div className="flex gap-2">
                    <button
                      disabled={busyId === b.id || b.status === 'confirmed'}
                      onClick={() => changeStatus(b, 'confirmed')}
                      className="w-7 h-7 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-40"
                      title="Confirmar"
                    ><FiCheck size={14}/></button>
                    <button
                      disabled={busyId === b.id || b.status === 'cancelled'}
                      onClick={() => changeStatus(b, 'cancelled')}
                      className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-40"
                      title="Cancelar"
                    ><FiX size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={6} className="text-center text-gray-400 py-8">Ainda não tens reservas associadas.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
