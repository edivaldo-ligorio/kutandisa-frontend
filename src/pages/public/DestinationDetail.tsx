import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiMapPin, FiStar, FiClock, FiCalendar,
  FiCheckCircle, FiCamera, FiShare2, FiHeart, FiTrendingUp
} from 'react-icons/fi';
import { destinations } from '../../data/destinations';

const difficultyColor: Record<string, string> = {
  'Fácil': 'badge-green',
  'Moderado': 'badge-yellow',
  'Exigente': 'badge-red',
};

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = destinations.find(d => d.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!dest) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <FiMapPin size={48} className="text-gray-300" />
        <h2 className="text-2xl font-bold text-dark">Destino não encontrado</h2>
        <button onClick={() => navigate(-1)} className="btn-primary">Voltar</button>
      </div>
    );
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${dest.lng - 0.5},${dest.lat - 0.5},${dest.lng + 0.5},${dest.lat + 0.5}&layer=mapnik&marker=${dest.lat},${dest.lng}`;
  const openMapUrl = `https://www.openstreetmap.org/?mlat=${dest.lat}&mlon=${dest.lng}#map=12/${dest.lat}/${dest.lng}`;

  const related = destinations.filter(d => d.id !== dest.id && (d.category === dest.category || d.province === dest.province)).slice(0, 3);

  return (
    <div className="min-h-screen bg-light">

      {/* Hero */}
      <div className="relative h-[65vh] min-h-[400px] overflow-hidden">
        <motion.img
          key={activeImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={dest.images[activeImg]}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium text-sm hover:bg-white/30 transition-all"
          >
            <FiArrowLeft size={16} /> Voltar
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-full backdrop-blur-sm border border-white/30 transition-all ${saved ? 'bg-red-500 border-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <FiHeart size={18} className={saved ? 'fill-white' : ''} />
            </button>
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all">
              <FiShare2 size={18} />
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 p-6">
          <div className="max-w-6xl mx-auto">
            <span className="badge bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs mb-3">
              {dest.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-heading text-white mb-2">{dest.name}</h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><FiMapPin size={14} />{dest.province}, Angola</span>
              <span className="flex items-center gap-1">
                <FiStar size={14} className="text-secondary fill-secondary" />
                {dest.rating} ({dest.reviews} avaliações)
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        {dest.images.length > 1 && (
          <div className="absolute bottom-6 right-6 flex gap-2">
            {dest.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-white scale-110' : 'border-white/40 opacity-60'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <FiClock size={18} />,      label: 'Duração',         value: dest.duration },
                { icon: <FiCalendar size={18} />,   label: 'Melhor Época',    value: dest.bestTime },
                { icon: <FiTrendingUp size={18} />, label: 'Dificuldade',     value: dest.difficulty, badge: difficultyColor[dest.difficulty] },
              ].map((s, i) => (
                <div key={i} className="card p-4 text-center">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white mx-auto mb-2">{s.icon}</div>
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  {s.badge
                    ? <span className={`badge text-xs ${s.badge}`}>{s.value}</span>
                    : <p className="text-sm font-bold text-dark">{s.value}</p>
                  }
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-dark font-heading mb-4">Sobre o Destino</h2>
              <p className="text-gray-600 leading-relaxed text-base">{dest.description}</p>
            </div>

            {/* Highlights */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-dark font-heading mb-4 flex items-center gap-2">
                <FiCamera size={20} className="text-primary" /> Destaques
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                    <FiCheckCircle size={17} className="text-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Map */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark font-heading flex items-center gap-2">
                  <FiMapPin size={20} className="text-primary" /> Localização
                </h2>
                <a
                  href={openMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  Abrir no mapa <FiArrowLeft size={13} className="rotate-[135deg]" />
                </a>
              </div>
              <div className="relative">
                <iframe
                  src={mapUrl}
                  title={`Mapa de ${dest.name}`}
                  width="100%"
                  height="380"
                  className="block border-0"
                  loading="lazy"
                />
                {/* Map overlay info */}
                <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-card px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                    <FiMapPin size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark">{dest.name}</p>
                    <p className="text-xs text-gray-500">{dest.province}, Angola</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Coordenadas: {dest.lat.toFixed(4)}° S, {dest.lng.toFixed(4)}° E &nbsp;·&nbsp; Mapa via OpenStreetMap
                </p>
              </div>
            </div>
          </div>

          {/* Right — booking card */}
          <div className="space-y-5">
            <div className="card p-6 sticky top-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">A partir de</p>
                  <p className="text-2xl font-black text-primary font-heading">{dest.price.split('–')[0]}</p>
                  <p className="text-xs text-gray-400">por pessoa</p>
                </div>
                <div className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full">
                  <FiStar size={14} className="text-secondary fill-secondary" />
                  <span className="text-sm font-bold text-dark">{dest.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Data de visita</label>
                  <input type="date" className="input text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">Número de pessoas</label>
                  <select className="input text-sm">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} pessoa{n>1?'s':''}</option>)}
                  </select>
                </div>
              </div>

              <Link to="/entrar" className="btn-primary w-full justify-center text-base py-3.5 mb-3">
                Reservar Agora
              </Link>
              <p className="text-center text-xs text-gray-400">Sem taxas de reserva ocultas</p>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preço por pessoa</span>
                  <span className="font-semibold text-dark">{dest.price.split('–')[0]} Kz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duração</span>
                  <span className="font-semibold text-dark">{dest.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dificuldade</span>
                  <span className={`badge text-xs ${difficultyColor[dest.difficulty]}`}>{dest.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Need help */}
            <div className="card p-5 bg-accent border border-primary/20">
              <p className="font-semibold text-dark text-sm mb-1">Precisa de ajuda?</p>
              <p className="text-xs text-gray-500 mb-3">A nossa equipa está disponível para personalizar a tua visita.</p>
              <Link to="/contactos" className="btn-outline text-xs px-4 py-2 w-full justify-center">
                Contactar equipa
              </Link>
            </div>
          </div>
        </div>

        {/* Related destinations */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black font-heading text-dark mb-6">Destinos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card card-hover group overflow-hidden cursor-pointer"
                >
                  <div className="h-44 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="badge-primary text-xs mb-2 inline-block">{r.category}</span>
                    <h3 className="font-bold text-dark mb-1 group-hover:text-primary transition-colors">{r.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-bold text-sm">{r.price.split('–')[0]} Kz</span>
                      <Link to={`/destinos/${r.id}`} className="btn-primary text-xs px-3 py-1.5">Ver mais</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
