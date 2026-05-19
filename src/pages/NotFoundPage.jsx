import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Zap } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-cyan-500/20"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative text-center px-4"
      >
        <div className="inline-flex p-4 rounded-3xl btn-gradient mb-6">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <h1 className="font-heading text-8xl sm:text-9xl font-bold text-gradient">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">Page not found in the cloud</p>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          The page you are looking for might have been moved or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-2xl btn-gradient font-semibold hover:scale-105 transition-transform"
        >
          <Home className="w-5 h-5" /> Return home
        </Link>
      </motion.div>
    </div>
  );
}
