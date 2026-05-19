import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/mockProducts';
import ProductCard from '../components/product/ProductCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import NotFoundPage from './NotFoundPage';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) return <NotFoundPage />;

  const images = product.images || [product.image];
  const related = getRelatedProducts(product);

  const handleAdd = () => {
    addToCart(product.id, qty);
    toast(`Added ${qty} × ${product.name} to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <Breadcrumbs items={[{ label: 'Shop', href: '/products' }, { label: product.name }]} />

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <motion.div className="card-premium overflow-hidden aspect-square group" whileHover={{ scale: 1.01 }}>
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </motion.div>
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <button key={i} type="button" onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${selectedImage === i ? 'border-indigo-500' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.badge && <span className="inline-block px-3 py-1 rounded-lg btn-gradient text-xs font-semibold mb-3">{product.badge}</span>}
          <h1 className="font-heading text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
            ))}
            <span className="text-slate-500 text-sm">({product.reviews} reviews)</span>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{product.description}</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-metric text-4xl font-bold">{formatCurrency(product.price)}</span>
            {product.originalPrice && <span className="text-xl text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>}
          </div>
          <p className="flex items-center gap-2 mt-4 text-sm text-emerald-500"><Truck className="w-4 h-4" /> Free delivery in 2–4 business days</p>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center glass rounded-xl">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus className="w-4 h-4" /></button>
              <span className="w-12 text-center font-metric font-bold">{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} className="p-3"><Plus className="w-4 h-4" /></button>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd} className="flex-1 py-3.5 rounded-2xl btn-gradient flex items-center justify-center gap-2 font-semibold">
              <ShoppingCart className="w-5 h-5" /> Add to cart
            </motion.button>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold mb-6">Related products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
