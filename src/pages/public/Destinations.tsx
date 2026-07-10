import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiSearch, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { destinations } from '../../data/destinations';

const categories = ['Todos', 'Natureza', 'Praia', 'História', 'Cidade'];

export default function Destinations() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Todos');

  const filtered = destinations.filter(d =>
    (cat === 'Todos' || d.category === cat) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.province.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-20">
      <div className="gradient-hero text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Descobre Angola</p>
          <h1 className="text-5xl font-black font-heading mb-4">Destinos Incríveis</h1>
          <p className="text-white/70 text-xl">Mais de 100 destinos para explorar em todo o país.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl flex-1 shadow-sm">
            <FiSearch className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar destinos..." className="flex-1 outline-none text-dark bg-transparent" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  cat === c ? 'gradient-primary text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">{filtered.length} destinos encontrados</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card card-hover group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 badge bg-white/90 text-primary text-xs">{d.category}</span>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white rounded-full px-2 py-1">
                  <FiStar size={11} className="text-secondary fill-secondary" />
                  <span className="text-xs font-bold text-dark">{d.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors">{d.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                  <FiMapPin size={13} /> {d.province}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-bold text-primary">{d.price}</span>
                  <Link to={`/destinos/${d.id}`}
                    className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                    Ver mais <FiArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
