import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import { APP_NAME } from '../../utils/constants';

const navLinks = [
  { to: '/products', label: 'Shop' },
  { to: '/#features', label: 'Features' },
  { to: '/#reviews', label: 'Reviews' },
];

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !transparent;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'glass-strong shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl">
          <div className="p-1.5 rounded-xl btn-gradient">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-gradient">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-indigo-500 ${
                  isActive ? 'text-indigo-500' : 'text-slate-600 dark:text-slate-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            to="/cart"
            className="relative p-2.5 rounded-xl glass hover:glow-hover"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full btn-gradient text-xs flex items-center justify-center font-bold"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link to="/dashboard" className="hidden sm:inline-flex px-4 py-2 rounded-xl glass text-sm font-medium hover:glow-hover">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex px-4 py-2 rounded-xl glass text-sm font-medium hover:glow-hover">
                Sign in
              </Link>
              <Link to="/register" className="hidden sm:inline-flex px-4 py-2.5 rounded-xl btn-gradient text-sm font-semibold">
                Get started
              </Link>
            </>
          )}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl glass"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-strong border-t border-white/10 mt-3 px-4 py-4 flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="py-2 font-medium">
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-gradient text-center py-2 rounded-xl">
                Get started
              </Link>
            </>
          )}
        </motion.div>
      )}
    </header>
  );
}
