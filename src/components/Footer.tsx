import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">K</span>
              </div>
              <span className="text-2xl font-black font-heading text-white">Kutandisa</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A plataforma de turismo angolana que conecta viajantes com as melhores experiências do país.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm">
              {['Destinos', 'Serviços', 'Mapa', 'Contactos'].map(item => (
                <li key={item}><a href="#" className="hover:text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              {['Como funciona', 'Para Operadores', 'Parceiros', 'Blog'].map(item => (
                <li key={item}><a href="#" className="hover:text-secondary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><FiMapPin size={15} className="text-secondary" /> Talatona, Luanda</li>
              <li className="flex items-center gap-2"><FiPhone size={15} className="text-secondary" /> +244 923 500 500</li>
              <li className="flex items-center gap-2"><FiMail size={15} className="text-secondary" /> info&#64;kutandisa.ao</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Kutandisa. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Termos</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
