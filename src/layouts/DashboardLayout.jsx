import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Bell, Search, LogOut, Menu } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import ThemeToggle from '../components/ui/ThemeToggle';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../context/AuthContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function DashboardLayout({ admin = false }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isLg = useMediaQuery('(min-width: 1024px)');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} admin={admin} />

      <div
        className="min-h-screen transition-all duration-300"
        style={{ marginLeft: isLg ? sidebarWidth : 0 }}
      >
        <header className="sticky top-0 z-30 glass-strong border-b border-slate-200/50 dark:border-slate-800 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl glass"
              onClick={() => setMobileSidebar(!mobileSidebar)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search dashboard..."
                className="w-full pl-9 pr-4 py-2 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="p-2.5 rounded-xl glass relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="text-sm">
                  <p className="font-medium leading-none">{user?.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <button type="button" onClick={handleLogout} className="p-2.5 rounded-xl glass" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 max-w-7xl">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
