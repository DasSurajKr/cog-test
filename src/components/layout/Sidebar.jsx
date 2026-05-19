import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  Zap,
  ClipboardList,
} from 'lucide-react';
import { APP_NAME } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const userNav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/profile', icon: Settings, label: 'Profile' },
];

const adminNav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Admin' },
  { to: '/admin', icon: Users, label: 'Users' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
];

export default function Sidebar({ collapsed, onToggle, admin = false }) {
  const { user } = useAuth();
  const items = admin ? adminNav : userNav;

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 glass-strong border-r border-slate-200/50 dark:border-slate-800"
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-heading font-bold"
            >
              <div className="p-1.5 rounded-xl btn-gradient">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-gradient text-sm">{APP_NAME}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button type="button" onClick={onToggle} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'btn-gradient shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && user && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
        </div>
      )}
    </motion.aside>
  );
}
