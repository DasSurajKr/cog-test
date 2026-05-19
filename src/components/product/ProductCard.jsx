import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const badgeStyles = {
  Trending: 'bg-purple-500/90',
  New: 'bg-emerald-500/90',
  Sale: 'bg-red-500/90',
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { toast } = useToast();
  const wished = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product.id);
    toast(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group card-premium overflow-hidden glow-hover"
    >
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white ${badgeStyles[product.badge] || 'bg-indigo-500'}`}
          >
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl glass opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-5 h-5 ${wished ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading font-semibold line-clamp-1 hover:text-indigo-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-metric text-lg font-bold">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="p-2.5 rounded-xl btn-gradient"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
