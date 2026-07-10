import { FiHeart, FiMapPin, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const favs = [
  { id:1, name:'Miradouro da Lua', category:'Natureza', rating:4.8, price:'25.000–75.000 Kz', image:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80', province:'Luanda' },
  { id:2, name:'Kalandula Falls',  category:'Natureza', rating:4.9, price:'40.000–100.000 Kz', image:'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&q=80', province:'Malanje' },
  { id:3, name:'Ilha do Mussulo',  category:'Praia',    rating:4.7, price:'30.000–90.000 Kz', image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', province:'Luanda' },
  { id:4, name:'Pungo Andongo',    category:'História', rating:4.7, price:'35.000–90.000 Kz', image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80', province:'Malanje' },
];

export default function ClientFavourites() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FiHeart size={20} className="text-red-500 fill-red-500"/>
        <h2 className="text-lg font-bold text-dark">{favs.length} Destinos Favoritos</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favs.map(f => (
          <div key={f.id} className="card card-hover group overflow-hidden relative">
            <div className="h-48 overflow-hidden">
              <img src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
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
          </div>
        ))}
      </div>
    </div>
  );
}
