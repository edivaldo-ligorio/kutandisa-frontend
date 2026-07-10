import { FiTrendingUp, FiArrowDownLeft, FiArrowUpRight, FiCreditCard } from 'react-icons/fi';
import StatsCard from '../../components/StatsCard';

const transactions = [
  { id:'#T001', type:'in',  from:'Maria João',    description:'Reserva Kalandula Falls', date:'15 Mar 2026', amount:'+90.000 Kz', status:'completed' },
  { id:'#T002', type:'out', from:'Angola Adventures', description:'Pagamento ao Operador', date:'15 Mar 2026', amount:'-77.000 Kz', status:'completed' },
  { id:'#T003', type:'in',  from:'Pedro Santos',  description:'Reserva Hotel Luanda',     date:'16 Mar 2026', amount:'+120.000 Kz', status:'pending'   },
  { id:'#T004', type:'in',  from:'Ana Costa',     description:'Reserva Parque do Iona',  date:'17 Mar 2026', amount:'+160.000 Kz', status:'completed' },
  { id:'#T005', type:'out', from:'Luanda Beach',  description:'Comissão operador',        date:'17 Mar 2026', amount:'-137.000 Kz', status:'completed' },
];

const statusColor: Record<string,string> = { completed:'badge-green', pending:'badge-yellow', failed:'badge-red' };
const statusLabel: Record<string,string> = { completed:'Concluído', pending:'Pendente', failed:'Falhou' };

export default function AdminPayments() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Receita Total"    value="56,6M Kz" icon={<FiCreditCard size={20}/>} change="+23% este mês"/>
        <StatsCard title="Receita Líquida" value="48M Kz"  icon={<FiTrendingUp size={20}/>}  change="85% margem"/>
        <StatsCard title="Entradas"        value="71,7M Kz" icon={<FiArrowDownLeft size={20}/>} change="este mês"/>
        <StatsCard title="Saídas"          value="23,7M Kz"  icon={<FiArrowUpRight size={20}/>}  change="comissões" changePositive={false}/>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-dark font-heading">Histórico de Transações</h3>
        </div>
        <table className="data-table">
          <thead><tr><th>ID</th><th>Tipo</th><th>De/Para</th><th>Descrição</th><th>Data</th><th>Montante</th><th>Estado</th></tr></thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td className="font-mono text-xs text-gray-400">{t.id}</td>
                <td>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.type==='in'?'bg-green-50 text-green-600':'bg-red-50 text-red-500'}`}>
                    {t.type==='in'?<FiArrowDownLeft size={14}/>:<FiArrowUpRight size={14}/>}
                  </div>
                </td>
                <td className="font-semibold text-dark text-sm">{t.from}</td>
                <td className="text-gray-500 text-xs">{t.description}</td>
                <td className="text-gray-400 text-xs">{t.date}</td>
                <td className={`font-bold text-sm ${t.type==='in'?'text-green-600':'text-red-500'}`}>{t.amount}</td>
                <td><span className={`badge text-xs ${statusColor[t.status]}`}>{statusLabel[t.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
