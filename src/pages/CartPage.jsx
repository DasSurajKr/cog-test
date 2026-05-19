import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, Tag, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { useToast } from '../context/ToastContext';

export default function CartPage() {
  const { cartDetails, updateQuantity, removeFromCart, subtotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'EQUI10') {
      setDiscount(subtotal * 0.1);
      toast('Coupon applied: 10% off');
    } else {
      toast('Invalid coupon code', 'error');
    }
  };

  if (!cartDetails.length) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <h1 className="font-heading text-3xl font-bold mt-8">Your cart is empty</h1>
        <Link to="/products" className="inline-block mt-6 px-6 py-3 rounded-2xl btn-gradient">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1 className="font-heading text-3xl font-bold mb-8">Shopping cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartDetails.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="card-premium p-4 flex gap-4"
              >
                <img src={item.product.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <Link to={`/products/${item.product.id}`} className="font-semibold hover:text-indigo-500">
                    {item.product.name}
                  </Link>
                  <p className="font-metric font-bold mt-1">{formatCurrency(item.product.price)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center glass rounded-lg">
                      <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.productId)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="font-metric font-bold">{formatCurrency(item.lineTotal)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="card-premium p-6 h-fit lg:sticky lg:top-28">
          <h2 className="font-heading font-semibold text-lg mb-4">Order summary</h2>
          <div className="flex gap-2 mb-4">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon (EQUI10)" className="flex-1 px-3 py-2 rounded-xl glass text-sm outline-none" />
            <button type="button" onClick={applyCoupon} className="px-4 py-2 rounded-xl glass"><Tag className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-500"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
            <div className="flex justify-between"><span>Est. delivery</span><span>2–4 days</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
          </div>
          <div className="flex justify-between font-metric text-xl font-bold mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <span>Total</span><span>{formatCurrency(total)}</span>
          </div>
          <Link to="/checkout" className="mt-6 w-full py-3 rounded-2xl btn-gradient flex items-center justify-center gap-2 font-semibold">
            Checkout <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
