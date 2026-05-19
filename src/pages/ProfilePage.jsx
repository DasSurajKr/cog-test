import { useState } from 'react';
import { User, MapPin, CreditCard, Shield } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const tabs = [
  { id: 'general', label: 'General', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '+1 555-0100' });

  const save = () => toast('Profile updated successfully');

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Profile' }]} />
      <h1 className="font-heading text-2xl font-bold mb-6">Profile settings</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="card-premium p-4 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === t.id ? 'btn-gradient' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 card-premium p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl btn-gradient flex items-center justify-center text-3xl font-bold text-white">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">{user?.name}</h2>
              <p className="text-slate-500">{user?.email}</p>
            </div>
          </div>

          {activeTab === 'general' && (
            <div className="space-y-4 max-w-md">
              {['name', 'email', 'phone'].map((f) => (
                <div key={f}>
                  <label className="text-sm font-medium capitalize mb-1 block">{f}</label>
                  <input
                    value={form[f] || ''}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              ))}
              <button type="button" onClick={save} className="px-6 py-3 rounded-xl btn-gradient font-semibold">
                Save changes
              </button>
            </div>
          )}

          {activeTab === 'addresses' && (
            <p className="text-slate-500">123 Cloud Street, San Francisco, CA 94102</p>
          )}
          {activeTab === 'payment' && (
            <p className="text-slate-500">Visa ending in 4242 · Exp 12/28</p>
          )}
          {activeTab === 'security' && (
            <div className="space-y-4 max-w-md">
              <input type="password" placeholder="Current password" className="w-full px-4 py-3 rounded-xl glass outline-none" />
              <input type="password" placeholder="New password" className="w-full px-4 py-3 rounded-xl glass outline-none" />
              <button type="button" onClick={save} className="px-6 py-3 rounded-xl btn-gradient font-semibold">
                Update password
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            {[
              { label: 'Total orders', value: '24' },
              { label: 'Wishlist', value: '8' },
              { label: 'Reviews', value: '12' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-metric text-2xl font-bold text-gradient">{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
