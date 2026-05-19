import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardCard from '../components/dashboard/DashboardCard';
import ChartCard from '../components/dashboard/ChartCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { revenueChartData } from '../data/mockStats';
import { formatCurrency } from '../utils/formatters';

const activity = [
  { id: 1, text: 'New order #4821 received', time: '2m ago' },
  { id: 2, text: 'Inventory alert: Aurora Headphones low stock', time: '15m ago' },
  { id: 3, text: 'Payment confirmed $349.99', time: '1h ago' },
  { id: 4, text: 'Customer review submitted (5★)', time: '3h ago' },
];

export default function UserDashboardPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      <h1 className="font-heading text-2xl font-bold mb-6">Overview</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Revenue" value="$72,400" change="+12.5% vs last month" icon={DollarSign} delay={0} />
        <DashboardCard title="Orders" value="520" change="+8.2%" icon={ShoppingBag} delay={0.05} />
        <DashboardCard title="Products" value="248" change="12 low stock" icon={Package} trend="down" delay={0.1} />
        <DashboardCard title="Conversion" value="3.8%" change="+0.4%" icon={TrendingUp} delay={0.15} />
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue trend" subtitle="Last 6 months" delay={0.2}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Orders" subtitle="Monthly volume" delay={0.25}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Bar dataKey="orders" fill="#06B6D4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <h3 className="font-heading font-semibold mb-4">Activity feed</h3>
          <ul className="space-y-4">
            {activity.map((a) => (
              <li key={a.id} className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0">
                <span>{a.text}</span>
                <span className="text-slate-400 shrink-0 ml-2">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-premium p-6">
          <h3 className="font-heading font-semibold mb-4">Quick actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Add product', 'View orders', 'Analytics', 'Settings'].map((label) => (
              <button key={label} type="button" className="py-3 px-4 rounded-xl glass text-sm font-medium hover:glow-hover">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
