import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardCard({ title, value, change, icon: Icon, trend = 'up', delay = 0 }) {
  const isUp = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-premium p-6 glow-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="font-metric text-3xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`flex items-center gap-1 text-sm mt-2 ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
              {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
            <Icon className="w-6 h-6 text-indigo-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
