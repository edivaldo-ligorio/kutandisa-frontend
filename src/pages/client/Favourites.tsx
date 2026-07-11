import { useEffect, useState } from 'react';
import { FiHeart, FiMapPin, FiStar, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { favouritesApi, Destination } from '../../services/api';

export default function ClientFavourites() {
  const [favs, setFavs] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    favouritesApi.getAll()
      .then(res => setFavs(res.data))
      .catch(err => setError(err.message || 'Não foi possível carregar os favoritos.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (id: number) => {
    setFavs(prev => prev.filter(f => f.id !== id));
    try {
      await favouritesApi.remove(id);
    } catch {
      load(); // reverte se a chamada falhar
    }
  };

  if (loading) {
    return <div className="card p-10 flex items-center justify-center gap-2 text-gray-500"><FiLoader className="animate-spin" /> A carregar favoritos...</div>;
  }
  if (error) {
    return <div className="card p-10 flex items-center justify-center gap-2 text-red-500"><FiAlertCircle /> {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FiHeart size={20} className="text-red-500 fill-red-500"/>
        <h2 className="text-lg font-bold text-dark">{favs.length} Destinos Favoritos</h2>
      </div>

      {favs.length === 0 && (
        <div className="card p-10 text-center text-gray-500">
          Ainda não guardaste nenhum destino. Clica no coração num destino para o adicionares aqui.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favs.map(f => (
          <Link key={f.id} to={`/destinos/${f.id}`} className="card card-hover group overflow-hidden relative block">
            <div className="h-48 overflow-hidden">
              <img src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <button
              onClick={(e) => { e.preventDefault(); handleRemove(f.id); }}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              title="Remover dos favoritos"
            >
              <FiHeart size={16} className="text-red-500 fill-red-500" />
            </button>
            <div className="p-5">
              <span className="badge-primary text-xs mb-2 inline-block">{f.category}</span>
              <h3 className="font-bold text-dark mb-1">{f.name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-3"><FiMapPin size={11}/>{f.province}</div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1"><FiStar size={13} className="text-secondary fill-secondary"/><span className="text-sm font-semibold text-dark">{f.rating}</span></div>
                <span className="font-bold text-primary text-sm">{f.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
