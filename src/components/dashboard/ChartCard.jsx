import { motion } from 'framer-motion';

export default function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-premium p-6"
    >
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      <div className="h-64">{children}</div>
    </motion.div>
  );
}
