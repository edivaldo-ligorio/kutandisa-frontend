// Client Bookings Page
import { useState } from 'react';
import { FiCalendar, FiSearch, FiFilter } from 'react-icons/fi';

const bookings = [
  { id:1, destination:'Kalandula Falls', date:'15 Mar 2026', operator:'Angola Adventures',     price:'90.000 Kz', status:'confirmed' },
  { id:2, destination:'Hotel Luanda',    date:'22 Mar 2026', operator:'Hotel de Convenção',    price:'120.000 Kz', status:'pending'   },
  { id:3, destination:'Ilha do Mussulo', date:'05 Abr 2026', operator:'Luanda Beach Resort',   price:'75.000 Kz', status:'confirmed' },
  { id:4, destination:'Pungo Andongo',   date:'20 Fev 2026', operator:'Angola Adventures',     price:'60.000 Kz', status:'cancelled' },
];

const statusColor: Record<string, string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string, string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

export default function ClientBookings() {
  const [search, setSearch] = useState('');
  const filtered = bookings.filter(b => b.destination.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl flex-1 shadow-sm">
          <FiSearch className="text-gray-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar reservas..." className="flex-1 outline-none text-dark bg-transparent text-sm" />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors">
          <FiFilter size={16}/> Filtrar
        </button>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>Destino</th><th>Data</th><th>Operador</th><th>Preço</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td className="font-semibold text-dark">{b.destination}</td>
                <td className="flex items-center gap-1 text-gray-500"><FiCalendar size={13}/>{b.date}</td>
                <td className="text-gray-600">{b.operator}</td>
                <td className="font-bold text-primary">{b.price}</td>
                <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                <td><button className="btn-ghost text-xs text-primary">Ver detalhes</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
