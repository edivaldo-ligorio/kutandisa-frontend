import { useState } from 'react';
import { FiSearch, FiCalendar } from 'react-icons/fi';

const bookings = [
  { id:'#K001', client:'Maria João',    operator:'Angola Adventures',  destination:'Kalandula Falls', date:'15 Mar 2026', amount:'90.000 Kz', status:'confirmed' },
  { id:'#K002', client:'Pedro Santos',  operator:'Luanda Beach Resort',destination:'Ilha Mussulo',    date:'16 Mar 2026', amount:'120.000 Kz', status:'pending'   },
  { id:'#K003', client:'Ana Costa',     operator:'Angola Adventures',  destination:'Parque do Iona',  date:'17 Mar 2026', amount:'160.000 Kz', status:'confirmed' },
  { id:'#K004', client:'Carlos F.',     operator:'Hotel Convenção',    destination:'Hotel Luanda',    date:'18 Mar 2026', amount:'75.000 Kz', status:'cancelled' },
  { id:'#K005', client:'Sofia Lopes',   operator:'Luanda Tours',       destination:'City Tour',       date:'19 Mar 2026', amount:'47.500 Kz',  status:'confirmed' },
];

const statusColor: Record<string,string> = { confirmed:'badge-green', pending:'badge-yellow', cancelled:'badge-red' };
const statusLabel: Record<string,string> = { confirmed:'Confirmado', pending:'Pendente', cancelled:'Cancelado' };

export default function AdminBookings() {
  const [search, setSearch] = useState('');
  const filtered = bookings.filter(b => b.client.toLowerCase().includes(search.toLowerCase()) || b.destination.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar reservas..." className="flex-1 outline-none text-dark bg-transparent text-sm"/>
      </div>
      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>ID</th><th>Cliente</th><th>Operador</th><th>Destino</th><th>Data</th><th>Montante</th><th>Estado</th></tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td className="font-mono text-xs text-gray-400">{b.id}</td>
                <td className="font-semibold text-dark">{b.client}</td>
                <td className="text-gray-500 text-xs">{b.operator}</td>
                <td className="text-gray-600">{b.destination}</td>
                <td className="flex items-center gap-1 text-gray-500 text-xs"><FiCalendar size={11}/>{b.date}</td>
                <td className="font-bold text-primary">{b.amount}</td>
                <td><span className={`badge text-xs ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
