import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';

const bookings = [
  { id:1, client:'Maria João',   service:'Safari Cultural', date:'15 Mar 2026', amount:'90.000 Kz', status:'pending'   },
  { id:2, client:'Pedro Santos', service:'City Tour',       date:'16 Mar 2026', amount:'47.500 Kz',  status:'confirmed' },
  { id:3, client:'Ana Costa',    service:'Safari Cultural', date:'17 Mar 2026', amount:'90.000 Kz', status:'confirmed' },
  { id:4, client:'João Figueiredo', service:'Alojamento',   date:'20 Mar 2026', amount:'110.000 Kz', status:'pending'   },
];

const statusColor: Record<string,string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string,string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

export default function OperatorBookings() {
  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Cliente</th><th>Serviço</th><th>Data</th><th>Montante</th><th>Estado</th><th>Ações</th></tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td className="font-semibold text-dark">{b.client}</td>
                <td className="text-gray-600">{b.service}</td>
                <td className="flex items-center gap-1 text-gray-500 text-sm"><FiCalendar size={12}/>{b.date}</td>
                <td className="font-bold text-primary">{b.amount}</td>
                <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                <td>
                  <div className="flex gap-2">
                    <button className="w-7 h-7 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"><FiCheck size={14}/></button>
                    <button className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"><FiX size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
