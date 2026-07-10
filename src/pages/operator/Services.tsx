import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const servicesData = [
  { id:1, name:'Safari Cultural Angola', category:'Pacotes',    price:90000, status:true,  rating:4.9, bookings:45 },
  { id:2, name:'City Tour Luanda',       category:'Transporte', price:47500,  status:true,  rating:4.7, bookings:32 },
  { id:3, name:'Jantar Típico Angolano', category:'Restaurante',price:22500,  status:false, rating:4.8, bookings:68 },
  { id:4, name:'Alojamento Panorâmico',  category:'Alojamento', price:110000, status:true,  rating:4.6, bookings:21 },
];

export default function OperatorServices() {
  const [services, setServices] = useState(servicesData);
  const toggle = (id: number) => setServices(s => s.map(srv => srv.id === id ? {...srv, status: !srv.status} : srv));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">{services.length} serviços registados</p>
        <button className="btn-primary text-sm"><FiPlus size={16}/> Novo Serviço</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(s => (
          <div key={s.id} className="card p-6 flex gap-4 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-dark">{s.name}</h4>
                <span className={`badge text-xs ${s.status ? 'badge-green' : 'badge-red'}`}>{s.status ? 'Activo' : 'Inactivo'}</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{s.category}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><FiStar size={11} className="text-secondary fill-secondary"/>{s.rating}</span>
                <span>{s.bookings} reservas</span>
                <span className="font-bold text-primary">{s.price.toLocaleString('pt-AO')} Kz</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggle(s.id)} className="text-gray-400 hover:text-primary transition-colors">
                {s.status ? <FiToggleRight size={24} className="text-primary"/> : <FiToggleLeft size={24}/>}
              </button>
              <button className="btn-ghost p-2 text-gray-400 hover:text-primary"><FiEdit2 size={16}/></button>
              <button className="btn-ghost p-2 text-gray-400 hover:text-red-500"><FiTrash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
