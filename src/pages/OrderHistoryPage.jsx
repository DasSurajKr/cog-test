import Breadcrumbs from '../components/ui/Breadcrumbs';
import { formatCurrency, formatDate } from '../utils/formatters';

const orders = [
  { id: 'EQ-4821', date: '2026-05-15', total: 349.99, status: 'Delivered', items: 1 },
  { id: 'EQ-4798', date: '2026-05-10', total: 728.99, status: 'Shipped', items: 2 },
  { id: 'EQ-4755', date: '2026-05-02', total: 189.0, status: 'Processing', items: 1 },
];

const statusColor = {
  Delivered: 'bg-emerald-500/20 text-emerald-500',
  Shipped: 'bg-blue-500/20 text-blue-500',
  Processing: 'bg-amber-500/20 text-amber-500',
};

export default function OrderHistoryPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Orders' }]} />
      <h1 className="font-heading text-2xl font-bold mb-6">Order history</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card-premium p-6 flex flex-wrap items-center justify-between gap-4 glow-hover">
            <div>
              <p className="font-metric font-bold">{order.id}</p>
              <p className="text-sm text-slate-500">{formatDate(order.date)} · {order.items} item(s)</p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColor[order.status]}`}>{order.status}</span>
            <p className="font-metric text-xl font-bold">{formatCurrency(order.total)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
