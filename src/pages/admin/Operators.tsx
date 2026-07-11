import { FiSearch, FiCheckCircle, FiXCircle, FiStar, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { operatorsApi, Operator } from '../../services/api';

const statusColor: Record<string,string> = { active:'badge-green', inactive:'badge-yellow', suspended:'badge-red' };
const statusLabel: Record<string,string> = { active:'Activo', inactive:'Inactivo', suspended:'Suspenso' };

function formatKz(amount: number) {
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}

export default function AdminOperators() {
  const [search, setSearch] = useState('');
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    operatorsApi.getAll()
      .then(res => setOperators(res.data))
      .catch(err => setError(err.message || 'Não foi possível carregar os operadores.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = operators.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  const changeStatus = async (o: Operator, status: string) => {
    setBusyId(o.id);
    try {
      const { operator } = await operatorsApi.updateStatus(o.id, status);
      setOperators(prev => prev.map(x => x.id === o.id ? operator : x));
    } catch (err: any) {
      setError(err.message || 'Não foi possível atualizar o estado.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar operadores..." className="flex-1 outline-none text-dark bg-transparent text-sm"/>
      </div>

      {error && <p className="text-sm text-red-500 flex items-center gap-2"><FiAlertCircle/> {error}</p>}

      {loading ? (
        <div className="card p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin"/> A carregar operadores...</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Operador</th><th>Categoria</th><th>Avaliação</th><th>Serviços</th><th>Receita</th><th>Estado</th><th>Ações</th></tr></thead>
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
                  <td className="font-bold text-primary">{formatKz(o.revenue)}</td>
                  <td><span className={`badge text-xs ${statusColor[o.status] || 'badge-yellow'}`}>{statusLabel[o.status] || o.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        disabled={busyId === o.id}
                        onClick={() => changeStatus(o, 'active')}
                        className="w-7 h-7 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                        title="Activar"
                      ><FiCheckCircle size={13}/></button>
                      <button
                        disabled={busyId === o.id}
                        onClick={() => changeStatus(o, 'suspended')}
                        className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                        title="Suspender"
                      ><FiXCircle size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-400 py-8">Nenhum operador encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
