import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <Loader2 className="w-10 h-10 text-indigo-500" />
      </motion.div>
    </div>
  );
}

export function Loader({ className = 'w-5 h-5' }) {
  return <Loader2 className={`animate-spin text-indigo-500 ${className}`} />;
}
