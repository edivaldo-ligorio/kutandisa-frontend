import { useState } from 'react';
import { FiSearch, FiUserPlus, FiEdit2, FiTrash2, FiLock, FiUnlock } from 'react-icons/fi';

const usersData = [
  { id:1, name:'Maria João',      email:'maria@email.com',    role:'client',   status:'active',   joined:'15 Jan 2026', bookings:8  },
  { id:2, name:'Pedro Santos',    email:'pedro@email.com',    role:'client',   status:'active',   joined:'20 Jan 2026', bookings:3  },
  { id:3, name:'Ana Costa',       email:'ana@email.com',      role:'client',   status:'inactive', joined:'10 Fev 2026', bookings:1  },
  { id:4, name:'Carlos Fernandes',email:'carlos@email.com',   role:'client',   status:'active',   joined:'05 Mar 2026', bookings:12 },
  { id:5, name:'Sofia Lopes',     email:'sofia@email.com',    role:'client',   status:'blocked',  joined:'01 Mar 2026', bookings:0  },
];

const statusColor: Record<string,string> = { active:'badge-green', inactive:'badge-yellow', blocked:'badge-red' };
const statusLabel: Record<string,string> = { active:'Activo', inactive:'Inactivo', blocked:'Bloqueado' };

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = usersData.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl flex-1 shadow-sm">
          <FiSearch className="text-gray-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar utilizadores..." className="flex-1 outline-none text-dark bg-transparent text-sm"/>
        </div>
        <button className="btn-primary text-sm whitespace-nowrap"><FiUserPlus size={16}/> Novo Utilizador</button>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead><tr><th>Utilizador</th><th>Email</th><th>Perfil</th><th>Reservas</th><th>Registo</th><th>Estado</th><th>Ações</th></tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span className="font-semibold text-dark">{u.name}</span>
                  </div>
                </td>
                <td className="text-gray-500 text-xs">{u.email}</td>
                <td><span className="badge-primary text-xs">Cliente</span></td>
                <td className="text-center font-semibold text-dark">{u.bookings}</td>
                <td className="text-gray-500 text-xs">{u.joined}</td>
                <td><span className={`badge text-xs ${statusColor[u.status]}`}>{statusLabel[u.status]}</span></td>
                <td>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"><FiEdit2 size={13}/></button>
                    <button className="w-7 h-7 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center hover:bg-yellow-50 hover:text-yellow-600 transition-colors">
                      {u.status === 'blocked' ? <FiUnlock size={13}/> : <FiLock size={13}/>}
                    </button>
                    <button className="w-7 h-7 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"><FiTrash2 size={13}/></button>
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
