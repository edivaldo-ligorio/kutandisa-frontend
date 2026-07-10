import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

export default function Contact() {
  return (
    <div className="pt-20">
      <div className="gradient-hero text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black font-heading mb-4">Fala Connosco</h1>
          <p className="text-white/70 text-xl">A nossa equipa está sempre disponível para ajudar.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black font-heading mb-8">Informações de Contacto</h2>
            <div className="space-y-6">
              {[
                { icon:<FiMapPin size={22}/>, label:'Morada', value:'Talatona, Luanda Sul, Angola' },
                { icon:<FiPhone size={22}/>, label:'Telefone', value:'+244 923 000 000' },
                { icon:<FiMail size={22}/>, label:'Email', value:'info&#64;kutandisa.ao' },
              ].map((c,i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{c.label}</p>
                    <p className="font-semibold text-dark" dangerouslySetInnerHTML={{__html:c.value}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8">
            <h3 className="text-2xl font-bold font-heading mb-6">Enviar Mensagem</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Nome</label><input className="input" placeholder="Teu nome" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label><input className="input" placeholder="email@exemplo.com" /></div>
              </div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Assunto</label><input className="input" placeholder="Como podemos ajudar?" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Mensagem</label><textarea className="input resize-none h-32" placeholder="Escreve a tua mensagem..." /></div>
              <button className="btn-primary w-full justify-center text-base py-4"><FiSend size={18}/> Enviar Mensagem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
