import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiArrowRight, FiEye, FiEyeOff, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const rolePaths: Record<string, string> = { client: '/cliente', operator: '/operador', admin: '/admin' };

// Escolha de tipo de conta — só usada ao CRIAR conta, nunca ao entrar.
const accountTypes = [
  { id: 'client'   as const, label: 'Cliente',  icon: <FiUser size={20}/>,      desc: 'Reservas e viagens' },
  { id: 'operator' as const, label: 'Operador', icon: <FiBriefcase size={20}/>, desc: 'Gerir serviços' },
];

export default function Login() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [accountType, setAccountType] = useState<'client' | 'operator'>('client');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  const { loginWithCredentials, registerWithCredentials, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const switchMode = (next: 'login' | 'register') => {
    setMode(next);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Preenche o email e a palavra-passe.'); return; }
    try {
      await loginWithCredentials(email.trim(), password);
      const { role, user } = useAuthStore.getState();
      toast.success(`Bem-vindo, ${user?.name?.split(' ')[0]}!`);
      navigate(rolePaths[role] || '/');
    } catch (err: any) {
      const isNetworkError = err.message?.includes('fetch') || err.message?.includes('Failed');
      setError(isNetworkError ? 'Não foi possível ligar ao servidor. Tenta novamente dentro de momentos.' : (err.message || 'Credenciais inválidas.'));
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!name.trim()) { setError('Escreve o teu nome.'); return; }
    if (!email.trim()) { setError('Escreve o teu email.'); return; }
    if (password.length < 6) { setError('A palavra-passe deve ter pelo menos 6 caracteres.'); return; }
    try {
      await registerWithCredentials(name.trim(), email.trim(), password, accountType);
      toast.success('Conta criada com sucesso!');
      navigate(rolePaths[accountType] || '/');
    } catch (err: any) {
      const isNetworkError = err.message?.includes('fetch') || err.message?.includes('Failed');
      setError(isNetworkError ? 'Não foi possível ligar ao servidor. Tenta novamente dentro de momentos.' : (err.message || 'Não foi possível criar a conta.'));
    }
  };

  const handleSubmit = () => mode === 'login' ? handleLogin() : handleRegister();

  return (
    <div className="min-h-screen flex">
      {/* Left — visual */}
      <div className="hidden lg:flex flex-1 gradient-primary text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
        <div className="flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="font-black text-lg">K</span>
            </div>
            <span className="text-2xl font-black font-heading">Kutandisa</span>
          </Link>
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all">
            <FiArrowLeft size={16}/> Voltar
          </button>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black font-heading leading-tight mb-4">
            A melhor forma de<br/>descobrir Angola
          </h2>
          <p className="text-white/70 text-lg">Junte-se a milhares de viajantes e operadores na plataforma de turismo angolana #1.</p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
          {['5.000+\nViajantes','120+\nDestinos','300+\nOperadores'].map((s,i)=>{
            const [val,lbl]=s.split('\n');
            return <div key={i}><div className="text-2xl font-black">{val}</div><div className="text-white/60 text-xs mt-1">{lbl}</div></div>;
          })}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="w-full max-w-md py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black font-heading text-dark mb-2">
              {mode === 'login' ? 'Entrar na Plataforma' : 'Criar Conta'}
            </h1>
            <p className="text-gray-500">
              {mode === 'login' ? 'Introduz as tuas credenciais para continuar' : 'Regista-te gratuitamente em segundos'}
            </p>
          </div>

          {/* Tipo de conta — só no registo */}
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {accountTypes.map(t => (
                <button key={t.id} onClick={() => setAccountType(t.id)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                    accountType === t.id ? 'border-primary bg-accent shadow-md' : 'border-gray-100 hover:border-gray-200'
                  }`}>
                  <div className={`w-10 h-10 ${t.id==='client'?'bg-primary':'bg-secondary'} rounded-xl flex items-center justify-center text-white mx-auto mb-2`}>{t.icon}</div>
                  <p className={`text-xs font-bold ${accountType===t.id?'text-primary':'text-dark'}`}>{t.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              <FiAlertCircle size={16}/> {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Nome</label>
                <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="O teu nome completo" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
              <input
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                type="email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Palavra-passe</label>
              <div className="relative">
                <input
                  className="input pr-12"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : ''}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-primary w-full justify-center text-base py-4 mb-4 disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading
              ? (mode === 'login' ? 'A entrar...' : 'A criar conta...')
              : mode === 'login'
                ? <>Entrar <FiArrowRight size={18}/></>
                : <>Criar Conta <FiArrowRight size={18}/></>
            }
          </button>

          <p className="text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>Não tens conta?{' '}
                <button onClick={() => switchMode('register')} className="text-primary font-semibold hover:underline">
                  Registar agora
                </button>
              </>
            ) : (
              <>Já tens conta?{' '}
                <button onClick={() => switchMode('login')} className="text-primary font-semibold hover:underline">
                  Entrar
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
