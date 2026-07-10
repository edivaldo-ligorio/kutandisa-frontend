interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changePositive?: boolean;
  color?: string;
}

export default function StatsCard({ title, value, icon, change, changePositive = true, color = 'bg-accent' }: Props) {
  return (
    <div className="card p-6 flex items-start gap-4 hover:shadow-cardHover transition-all duration-300">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-primary shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-black text-dark font-heading">{value}</p>
        {change && (
          <p className={`text-xs font-semibold mt-1 ${changePositive ? 'text-green-600' : 'text-red-500'}`}>
            {changePositive ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
    </div>
  );
}
