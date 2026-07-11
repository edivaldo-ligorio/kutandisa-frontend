import { useEffect, useState } from 'react';
import { FiSearch, FiTrash2, FiLock, FiUnlock, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { usersApi, User } from '../../services/api';

const statusColor: Record<string,string> = { active:'badge-green', inactive:'badge-yellow', suspended:'badge-red' };
const statusLabel: Record<string,string> = { active:'Activo', inactive:'Inactivo', suspended:'Bloqueado' };
const roleLabel: Record<string,string> = { client:'Cliente', operator:'Operador', admin:'Admin', guest:'Visitante' };

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    usersApi.getAll()
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message || 'Não foi possível carregar os utilizadores.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleBlock = async (u: User) => {
    setBusyId(u.id);
    const nextStatus = u.status === 'suspended' ? 'active' : 'suspended';
    try {
      const { user } = await usersApi.updateStatus(u.id, nextStatus);
      setUsers(prev => prev.map(x => x.id === u.id ? user : x));
    } catch (err: any) {
      setError(err.message || 'Não foi possível atualizar o estado.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (u: User) => {
    if (!confirm(`Remover o utilizador ${u.name}? Esta ação não pode ser desfeita.`)) return;
    setBusyId(u.id);
    try {
      await usersApi.delete(u.id);
      setUsers(prev => prev.filter(x => x.id !== u.id));
    } catch (err: any) {
      setError(err.message || 'Não foi possível remover o utilizador.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl flex-1 shadow-sm">
          <FiSearch className="text-gray-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar utilizadores..." className="flex-1 outline-none text-dark bg-transparent text-sm"/>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 flex items-center gap-2"><FiAlertCircle/> {error}</p>}

      {loading ? (
        <div className="card p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar utilizadores...</div>
      ) : (
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
                  <td><span className="badge-primary text-xs">{roleLabel[u.role] || u.role}</span></td>
                  <td className="text-center font-semibold text-dark">{u.bookings}</td>
                  <td className="text-gray-500 text-xs">{u.joined}</td>
                  <td><span className={`badge text-xs ${statusColor[u.status] || 'badge-yellow'}`}>{statusLabel[u.status] || u.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        disabled={busyId === u.id}
                        onClick={() => toggleBlock(u)}
                        className="w-7 h-7 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center hover:bg-yellow-50 hover:text-yellow-600 transition-colors disabled:opacity-50"
                        title={u.status === 'suspended' ? 'Desbloquear' : 'Bloquear'}
                      >
                        {u.status === 'suspended' ? <FiUnlock size={13}/> : <FiLock size={13}/>}
                      </button>
                      <button
                        disabled={busyId === u.id}
                        onClick={() => handleDelete(u)}
                        className="w-7 h-7 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Remover"
                      >
                        <FiTrash2 size={13}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-400 py-8">Nenhum utilizador encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
