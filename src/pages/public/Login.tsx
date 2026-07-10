import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiShield, FiArrowRight, FiEye, FiEyeOff, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';
import type { UserRole } from '../../stores/authStore';
import toast from 'react-hot-toast';

const roles = [
  { id: 'client'   as UserRole, label: 'Cliente',   icon: <FiUser size={22}/>,      desc: 'Reservas e viagens', path: '/cliente',  color: 'bg-primary',   email: 'maria@kutandisa.ao',  pass: '123456'   },
  { id: 'operator' as UserRole, label: 'Operador',  icon: <FiBriefcase size={22}/>, desc: 'Gerir serviços',     path: '/operador', color: 'bg-secondary', email: 'hotel@kutandisa.ao',  pass: 'hotel123' },
  { id: 'admin'    as UserRole, label: 'Admin',     icon: <FiShield size={22}/>,    desc: 'Painel de controlo', path: '/admin',    color: 'bg-red-500',   email: 'admin@kutandisa.ao',  pass: 'admin123' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [email, setEmail]       = useState('maria@kutandisa.ao');
  const [password, setPassword] = useState('123456');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  const { loginWithCredentials, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSelectRole = (r: typeof roles[0]) => {
    setSelectedRole(r.id);
    setEmail(r.email);
    setPassword(r.pass);
    setError('');
  };

  const handleLogin = async () => {
    setError('');
    try {
      await loginWithCredentials(email, password);
      const r = roles.find(r => r.id === selectedRole);
      toast.success(`Bem-vindo ao painel ${r?.label}!`);
      navigate(r?.path || '/');
    } catch (err: any) {
      // Fallback demo: se backend não disponível, usa switchRole
      if (err.message?.includes('fetch') || err.message?.includes('Failed')) {
        const { switchRole } = useAuthStore.getState();
        switchRole(selectedRole);
        const r = roles.find(r => r.id === selectedRole);
        toast.success(`Demo: Bem-vindo ao painel ${r?.label}!`);
        navigate(r?.path || '/');
      } else {
        setError(err.message || 'Credenciais inválidas');
      }
    }
  };

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
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-black font-heading text-dark mb-2">Entrar na Plataforma</h1>
            <p className="text-gray-500">Seleciona o teu perfil para continuar</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {roles.map(r => (
              <button key={r.id} onClick={() => handleSelectRole(r)}
                className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                  selectedRole === r.id ? `border-primary bg-accent shadow-md` : 'border-gray-100 hover:border-gray-200'
                }`}>
                <div className={`w-10 h-10 ${r.color} rounded-xl flex items-center justify-center text-white mx-auto mb-2`}>{r.icon}</div>
                <p className={`text-xs font-bold ${selectedRole===r.id?'text-primary':'text-dark'}`}>{r.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              <FiAlertCircle size={16}/> {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
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
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="btn-primary w-full justify-center text-base py-4 mb-4 disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? 'A entrar...' : <>Entrar como {roles.find(r=>r.id===selectedRole)?.label} <FiArrowRight size={18}/></>}
          </button>

          <p className="text-center text-sm text-gray-500">
            Não tens conta?{' '}
            <button onClick={handleLogin} className="text-primary font-semibold hover:underline">
              Registar agora
            </button>
          </p>

          <div className="mt-6 p-4 bg-accent rounded-xl border border-primary/20">
            <p className="text-xs text-primary font-semibold mb-2">Credenciais de Demo</p>
            <div className="space-y-1">
              {roles.map(r => (
                <div key={r.id} className="flex justify-between text-xs text-gray-600">
                  <span className="font-medium">{r.label}:</span>
                  <span className="font-mono">{r.email} / {r.pass}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
