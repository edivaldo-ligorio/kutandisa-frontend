import { useState } from 'react';
import { FiStar, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  { id:1, name:'Hotel de Convenção de Talatona', category:'Alojamento', rating:4.6, reviews:342, price:'60.000–150.000 Kz/noite', image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
  { id:2, name:'Restaurante Oon Dala',           category:'Restaurante', rating:4.8, reviews:218, price:'10.000–25.000 Kz/pessoa', image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80' },
  { id:3, name:'Angola Adventures',              category:'Pacotes',     rating:4.9, reviews:156, price:'100.000–250.000 Kz',      image:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
  { id:4, name:'Luanda Beach Resort',            category:'Alojamento', rating:4.7, reviews:289, price:'75.000–200.000 Kz/noite', image:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80' },
  { id:5, name:'Cozinha de Angola',              category:'Restaurante', rating:4.6, reviews:175, price:'7.500–20.000 Kz/pessoa', image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { id:6, name:'Luanda City Tours',              category:'Transporte',  rating:4.5, reviews:134, price:'25.000–60.000 Kz',       image:'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80' },
];

const cats = ['Todos', 'Alojamento', 'Restaurante', 'Pacotes', 'Transporte'];

export default function Services() {
  const [cat, setCat] = useState('Todos');
  const [search, setSearch] = useState('');
  const filtered = services.filter(s => (cat === 'Todos' || s.category === cat) && s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-20">
      <div className="gradient-hero text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Parceiros Verificados</p>
          <h1 className="text-5xl font-black font-heading mb-4">Serviços de Qualidade</h1>
          <p className="text-white/70 text-xl">Alojamento, restaurantes, transporte e experiências únicas.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl flex-1 shadow-sm">
            <FiSearch className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar serviços..." className="flex-1 outline-none text-dark bg-transparent" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${cat === c ? 'gradient-primary text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((s,i) => (
            <motion.div key={s.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
              className="card card-hover group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className={`absolute top-4 left-4 badge text-xs ${s.category==='Alojamento'?'badge-blue':s.category==='Restaurante'?'badge-green':s.category==='Pacotes'?'badge-primary':'badge-yellow'}`}>{s.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">{[...Array(5)].map((_,j)=><FiStar key={j} size={12} className="text-secondary fill-secondary"/>)}</div>
                  <span className="text-xs text-gray-500">{s.rating} ({s.reviews} avaliações)</span>
                </div>
                <h3 className="font-bold text-dark text-lg mb-3 group-hover:text-primary transition-colors">{s.name}</h3>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-bold text-primary text-sm">{s.price}</span>
                  <Link to="/entrar" className="btn-primary text-xs px-4 py-2">Reservar</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
