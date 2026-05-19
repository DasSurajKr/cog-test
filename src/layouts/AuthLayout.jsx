import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';
import PageTransition from '../components/layout/PageTransition';
import { APP_NAME } from '../utils/constants';

export default function AuthLayout() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-cyan-500/20 dark:from-indigo-900/40"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <Link to="/" className="absolute top-4 left-4 z-10 flex items-center gap-2 font-heading font-bold">
        <div className="p-1.5 rounded-xl btn-gradient">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-gradient">{APP_NAME}</span>
      </Link>

      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}
