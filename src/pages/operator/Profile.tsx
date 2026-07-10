import { FiBriefcase, FiMail, FiPhone, FiMapPin, FiSave, FiGlobe } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';

export default function OperatorProfile() {
  const { user } = useAuthStore();
  return (
    <div className="max-w-2xl space-y-6">
      <div className="card p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-dark text-2xl font-black">
            {user?.avatar}
          </div>
          <div>
            <h2 className="text-xl font-black text-dark">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="badge-yellow text-xs mt-1 inline-block">Operador Verificado</span>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label:'Nome do Negócio', icon:<FiBriefcase size={16}/>, value:user?.name },
            { label:'Email',           icon:<FiMail size={16}/>,      value:user?.email },
            { label:'Telefone',        icon:<FiPhone size={16}/>,     value:'+244 923 111 222' },
            { label:'Localização',     icon:<FiMapPin size={16}/>,    value:'Luanda, Angola' },
            { label:'Website',         icon:<FiGlobe size={16}/>,     value:'www.hotelluanda.ao' },
          ].map((f,i) => (
            <div key={i}>
              <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">{f.icon}{f.label}</label>
              <input className="input" defaultValue={f.value || ''} />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Descrição do Negócio</label>
            <textarea className="input resize-none h-28" defaultValue="Hotel boutique com vista panorâmica sobre Luanda. Serviços premium de alojamento e restauração." />
          </div>
          <button className="btn-primary mt-4"><FiSave size={16}/> Guardar Alterações</button>
        </div>
      </div>
    </div>
  );
}
