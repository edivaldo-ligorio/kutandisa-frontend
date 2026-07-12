import { Link } from 'react-router-dom';
import { destinations as allDests } from '../../data/destinations';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiArrowRight, FiShield, FiUsers, FiAward, FiCompass } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';

const rolePaths: Record<string, string> = { client: '/cliente', operator: '/operador', admin: '/admin' };

const destinations = allDests.slice(0, 3);

const services = [
  { id:1, name:'Hotel de Convenção de Talatona', category:'Alojamento', rating:4.6, price:'60.000–150.000 Kz/noite', image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
  { id:2, name:'Restaurante Oon Dala', category:'Restaurante', rating:4.8, price:'10.000–25.000 Kz/pessoa', image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80' },
  { id:3, name:'Angola Adventures', category:'Pacotes', rating:4.9, price:'100.000–250.000 Kz', image:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
];

const testimonials = [
  { name:'Ana Rodrigues', role:'Viajante', text:'Experiência incrível! O guia foi excelente e os destinos surpreendentes.', avatar:'AR', rating:5 },
  { name:'Pedro Santos', role:'Fotógrafo', text:'Kutandisa abriu-me as portas para uma Angola que nunca imaginei.', avatar:'PS', rating:5 },
  { name:'Carla Mendes', role:'Família', text:'Perfeito para férias em família. Serviço impecável do início ao fim.', avatar:'CM', rating:5 },
];

const stats = [
  { value:'5.000+', label:'Viajantes satisfeitos', icon:<FiUsers size={24}/> },
  { value:'120+',   label:'Destinos descobertos',   icon:<FiMapPin size={24}/> },
  { value:'300+',   label:'Operadores parceiros',   icon:<FiAward size={24}/> },
  { value:'4.9★',   label:'Avaliação média',        icon:<FiStar size={24}/> },
];

const features = [
  { icon:<FiCompass size={28}/>, title:'Guias Locais', desc:'Experientes e certificados que conhecem cada detalhe de Angola.' },
  { icon:<FiShield size={28}/>, title:'Reservas Seguras', desc:'Pagamentos protegidos e confirmação instantânea.' },
  { icon:<FiStar size={28}/>, title:'Avaliações Reais', desc:'Opiniões honestas de viajantes como tu.' },
  { icon:<FiUsers size={28}/>, title:'Suporte 24/7', desc:'Equipa sempre disponível para ajudar durante a tua viagem.' },
];

const fadeUp = { hidden:{opacity:0,y:30}, show:{opacity:1,y:0} };

export default function Home() {
  const { isAuthenticated, role, user } = useAuthStore();
  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
            alt="Angola" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{duration:0.6}}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full text-secondary text-sm font-semibold mb-6">
            <FiMapPin size={14}/> Descobre o melhor de Angola
          </motion.div>
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} transition={{duration:0.6,delay:0.15}}
            className="text-6xl md:text-8xl font-black font-heading leading-tight mb-6">
            Explora Angola<br/>
            <span className="text-secondary">com Estilo</span>
          </motion.h1>
          <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{duration:0.6,delay:0.3}}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            A plataforma definitiva de turismo angolano. Destinos autênticos, guias experientes e experiências inesquecíveis.
          </motion.p>
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{duration:0.6,delay:0.45}}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinos" className="btn-secondary text-lg px-8 py-4 shadow-xl">
              Explorar Destinos <FiArrowRight size={18}/>
            </Link>
            <Link to="/servicos" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-dark transition-all">
              Ver Serviços
            </Link>
          </motion.div>
          {/* Stats bar */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{duration:0.6,delay:0.6}}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            {stats.map((s,i) => (
              <div key={i} className="text-center">
                <div className="text-secondary mb-1 flex justify-center">{s.icon}</div>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-white/60 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Porquê Kutandisa?</p>
            <h2 className="section-title">Tudo o que precisas<br/>para viajar em Angola</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f,i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-card transition-all duration-300 text-center cursor-default">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white mb-5 mx-auto group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-dark mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Destinos em Destaque</p>
              <h2 className="section-title">Lugares que vão<br/>surpreender-te</h2>
            </div>
            <Link to="/destinos" className="btn-outline mt-4 md:mt-0 self-start">
              Ver Todos <FiArrowRight size={16}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((d,i) => (
              <motion.div key={d.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                className="card card-hover group overflow-hidden cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-4 left-4 badge-primary text-xs">{d.category}</span>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiStar size={12} className="text-secondary fill-secondary" />
                    <span className="text-xs font-bold text-dark">{d.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-dark text-lg mb-1">{d.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <FiMapPin size={13}/> {d.province}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">{d.price}</span>
                    <Link to={`/destinos/${d.id}`} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                      Ver mais <FiArrowRight size={13}/>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Serviços em Destaque</p>
              <h2 className="section-title">Alojamento, Restaurantes<br/>e Experiências</h2>
            </div>
            <Link to="/servicos" className="btn-outline mt-4 md:mt-0 self-start">
              Ver Todos <FiArrowRight size={16}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s,i) => (
              <motion.div key={s.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                className="card card-hover group overflow-hidden cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 badge-green text-xs">{s.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_,j) => <FiStar key={j} size={12} className="text-secondary fill-secondary"/>)}
                    <span className="text-xs text-gray-500 ml-1">{s.rating}</span>
                  </div>
                  <h3 className="font-bold text-dark mb-1">{s.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-bold text-sm">{s.price}</span>
                    <Link to="/servicos" className="btn-primary text-xs px-4 py-2">Reservar</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Testemunhos</p>
            <h2 className="section-title">O que dizem os nossos<br/>viajantes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t,i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_,j) => <FiStar key={j} size={16} className="text-secondary fill-secondary"/>)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-heading mb-6">
            {isAuthenticated ? `Pronta para a próxima aventura, ${user?.name?.split(' ')[0]}?` : 'Pronto para descobrir Angola?'}
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            {isAuthenticated ? 'Explora novos destinos ou vê as tuas reservas no teu painel.' : 'Regista-te gratuitamente e começa a planear a tua próxima aventura.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? (rolePaths[role] || '/') : '/entrar'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-dark font-bold rounded-full text-lg hover:bg-secondary-light transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {isAuthenticated ? 'Ir para o Meu Painel' : 'Começar Agora'} <FiArrowRight size={20}/>
            </Link>
            <Link to="/destinos" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-primary transition-all">
              Ver Destinos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
