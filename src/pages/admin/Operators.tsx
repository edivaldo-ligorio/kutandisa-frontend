import { FiSearch, FiCheckCircle, FiXCircle, FiStar } from 'react-icons/fi';
import { useState } from 'react';

const operators = [
  { id:1, name:'Hotel de Convenção',  category:'Alojamento', rating:4.6, services:8,  bookings:342, revenue:'20,7M Kz', status:'active'  },
  { id:2, name:'Angola Adventures',   category:'Pacotes',    rating:4.9, services:12, bookings:218, revenue:'19,2M Kz', status:'active'  },
  { id:3, name:'Restaurante Oon Dala',category:'Restaurante',rating:4.8, services:3,  bookings:156, revenue:'4M Kz',  status:'active'  },
  { id:4, name:'Luanda Tours',        category:'Transporte', rating:4.4, services:5,  bookings:89,  revenue:'4,5M Kz',  status:'pending' },
];

const statusColor: Record<string,string> = { active:'badge-green', pending:'badge-yellow', suspended:'badge-red' };
const statusLabel: Record<string,string> = { active:'Activo', pending:'Em revisão', suspended:'Suspenso' };

export default function AdminOperators() {
  const [search, setSearch] = useState('');
  const filtered = operators.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar operadores..." className="flex-1 outline-none text-dark bg-transparent text-sm"/>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Operador</th><th>Categoria</th><th>Avaliação</th><th>Serviços</th><th>Reservas</th><th>Receita</th><th>Estado</th><th>Ações</th></tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}>
                <td className="font-semibold text-dark">{o.name}</td>
                <td className="text-gray-500 text-xs">{o.category}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <FiStar size={12} className="text-secondary fill-secondary"/>
                    <span className="font-semibold text-dark text-sm">{o.rating}</span>
                  </div>
                </td>
                <td className="text-center font-semibold">{o.services}</td>
                <td className="text-center font-semibold">{o.bookings}</td>
                <td className="font-bold text-primary">{o.revenue}</td>
                <td><span className={`badge text-xs ${statusColor[o.status]}`}>{statusLabel[o.status]}</span></td>
                <td>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"><FiCheckCircle size={13}/></button>
                    <button className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"><FiXCircle size={13}/></button>
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
