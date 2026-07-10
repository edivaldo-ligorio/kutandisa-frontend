import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';

export default function ClientProfile() {
  const { user } = useAuthStore();
  return (
    <div className="max-w-2xl space-y-6">
      <div className="card p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black">
            {user?.avatar || user?.name?.[0]}
          </div>
          <div>
            <h2 className="text-xl font-black text-dark">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="badge-primary text-xs mt-1 inline-block">Cliente Verificado</span>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label:'Nome completo', icon:<FiUser size={16}/>, defaultValue:user?.name },
            { label:'Email',         icon:<FiMail size={16}/>, defaultValue:user?.email },
            { label:'Telefone',      icon:<FiPhone size={16}/>, defaultValue:'+244 923 000 000' },
            { label:'Localização',   icon:<FiMapPin size={16}/>, defaultValue:'Luanda, Angola' },
          ].map((f,i) => (
            <div key={i}>
              <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">{f.icon}{f.label}</label>
              <input className="input" defaultValue={f.defaultValue || ''} />
            </div>
          ))}
          <button className="btn-primary mt-4"><FiSave size={16}/> Guardar Alterações</button>
        </div>
      </div>
    </div>
  );
}
