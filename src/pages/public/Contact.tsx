import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { contactApi } from '../../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Preenche todos os campos antes de enviar.');
      return;
    }
    setSending(true);
    try {
      await contactApi.send(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Não foi possível enviar a mensagem. Tenta novamente.');
    } finally {
      setSending(false);
    }
  };

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
                { icon:<FiMail size={22}/>, label:'Email', value:'info@kutandisa.ao' },
              ].map((c,i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{c.label}</p>
                    <p className="font-semibold text-dark">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8">
            <h3 className="text-2xl font-bold font-heading mb-6">Enviar Mensagem</h3>

            {sent ? (
              <div className="flex flex-col items-center text-center gap-3 py-10">
                <FiCheckCircle size={48} className="text-primary" />
                <p className="font-semibold text-dark">Mensagem enviada com sucesso!</p>
                <p className="text-sm text-gray-500">Entraremos em contacto brevemente.</p>
                <button className="btn-ghost text-primary text-sm mt-2" onClick={() => setSent(false)}>Enviar outra mensagem</button>
              </div>
            ) : (
              <div className="space-y-4">
                {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Nome</label><input value={form.name} onChange={handleChange('name')} className="input" placeholder="Teu nome" /></div>
                  <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label><input value={form.email} onChange={handleChange('email')} className="input" placeholder="email@exemplo.com" /></div>
                </div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Assunto</label><input value={form.subject} onChange={handleChange('subject')} className="input" placeholder="Como podemos ajudar?" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Mensagem</label><textarea value={form.message} onChange={handleChange('message')} className="input resize-none h-32" placeholder="Escreve a tua mensagem..." /></div>
                <button onClick={handleSubmit} disabled={sending} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
                  <FiSend size={18}/> {sending ? 'A enviar...' : 'Enviar Mensagem'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
