import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import DashboardCard from '../components/dashboard/DashboardCard';
import ChartCard from '../components/dashboard/ChartCard';
import DataTable from '../components/dashboard/DataTable';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { mockUsers } from '../data/mockUsers';
import { revenueChartData, trafficData } from '../data/mockStats';

const COLORS = ['#4F46E5', '#06B6D4', '#9333EA', '#10B981'];

const userColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${row.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/20 text-slate-400'}`}>
        {row.status}
      </span>
    ),
  },
  { key: 'orders', label: 'Orders', sortable: true },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Admin' }]} />
      <h1 className="font-heading text-2xl font-bold mb-6">Admin control center</h1>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total users" value="12,847" change="+124 this week" icon={Users} />
        <DashboardCard title="Revenue" value="$1.2M" change="+18%" icon={DollarSign} />
        <DashboardCard title="Orders today" value="342" change="+5.2%" icon={ShoppingCart} />
        <DashboardCard title="System uptime" value="99.99%" change="All systems operational" icon={Activity} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Traffic sources">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={trafficData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {trafficData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue analytics">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#06B6D4' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <h2 className="font-heading text-lg font-semibold mb-4">User management</h2>
      <DataTable columns={userColumns} data={mockUsers} searchKeys={['name', 'email']} />
    </div>
  );
}
