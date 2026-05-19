import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, MapPin, Package } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { useToast } from '../context/ToastContext';

const steps = [
  { id: 1, label: 'Shipping', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: Package },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const { cartDetails, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '', street: '', city: '', zip: '', card: '', expiry: '', cvv: '',
  });

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const placeOrder = () => {
    setDone(true);
    clearCart();
    toast('Order placed successfully!');
  };

  if (!cartDetails.length && !done) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <p>Your cart is empty.</p>
        <Link to="/products" className="inline-block mt-4 btn-gradient px-6 py-3 rounded-2xl">Shop now</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 mx-auto rounded-full btn-gradient flex items-center justify-center mb-6">
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="font-heading text-3xl font-bold">Order confirmed!</h1>
        <p className="text-slate-500 mt-2">Thank you for shopping with EquiCart.</p>
        <Link to="/orders" className="inline-block mt-8 px-6 py-3 rounded-2xl btn-gradient">View orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex justify-center gap-4 mb-10">
        {steps.map((s) => (
          <div key={s.id} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${step >= s.id ? 'btn-gradient text-white' : 'glass'}`}>
            <s.icon className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="ship" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <h2 className="font-semibold text-lg">Shipping address</h2>
                {['name', 'street', 'city', 'zip'].map((f) => (
                  <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f]} onChange={update(f)} className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50" />
                ))}
                <button type="button" onClick={() => setStep(2)} className="w-full py-3 rounded-xl btn-gradient font-semibold">Continue to payment</button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <h2 className="font-semibold text-lg">Payment details</h2>
                <input placeholder="Card number" value={form.card} onChange={update('card')} className="w-full px-4 py-3 rounded-xl glass outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM/YY" value={form.expiry} onChange={update('expiry')} className="px-4 py-3 rounded-xl glass outline-none" />
                  <input placeholder="CVV" value={form.cvv} onChange={update('cvv')} className="px-4 py-3 rounded-xl glass outline-none" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl glass">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl btn-gradient font-semibold">Review order</button>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="rev" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <h2 className="font-semibold text-lg mb-4">Review your order</h2>
                {cartDetails.map((i) => (
                  <div key={i.productId} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span>{i.product.name} × {i.quantity}</span>
                    <span>{formatCurrency(i.lineTotal)}</span>
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl glass">Back</button>
                  <button type="button" onClick={placeOrder} className="flex-1 py-3 rounded-xl btn-gradient font-semibold">Place order</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="card-premium p-6 h-fit">
          <h3 className="font-semibold mb-4">Order summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
          </div>
          <div className="flex justify-between font-metric text-xl font-bold mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <span>Total</span><span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
