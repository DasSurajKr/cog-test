import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Cloud, BarChart3, Cpu, Shirt, Home, Dumbbell, Sparkles } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { products, categories } from '../data/mockProducts';
import { reviews } from '../data/mockReviews';
import { landingStats } from '../data/mockStats';

const categoryIcons = { Cpu, Shirt, Home, Dumbbell, Sparkles };

export default function LandingPage() {
  const featured = products.filter((p) => p.trending).slice(0, 4);
  const [reviewIndex, setReviewIndex] = useState(0);

  return (
    <div className="max-w-7xl mx-auto">
      <section className="relative min-h-[90vh] flex items-center justify-center text-center pt-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/30 via-blue-600/20 to-cyan-500/30 dark:from-indigo-900/50"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium mb-6"
          >
            Cloud-native commerce platform
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto leading-tight"
          >
            Commerce at the speed of <span className="text-gradient">cloud innovation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            EquiCart delivers enterprise-grade storefronts, analytics, and checkout — polished like Stripe, scaled like AWS.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl btn-gradient text-lg font-semibold">
              Explore shop <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl glass font-semibold hover:glow-hover">
              Start free trial
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {landingStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-6 text-center glow-hover"
          >
            <p className="font-metric text-3xl sm:text-4xl font-bold text-gradient">
              {stat.value}
              {stat.suffix}
            </p>
            <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section id="features" className="py-20">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">Built for enterprise teams</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Cloud, title: 'Cloud-native', desc: 'Deploy globally with edge-ready architecture.' },
            { icon: Shield, title: 'JWT-ready security', desc: 'Authentication flows built for production APIs.' },
            { icon: BarChart3, title: 'Real-time analytics', desc: 'Dashboards that rival Stripe and Vercel.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium p-8 glow-hover"
            >
              <div className="p-3 rounded-2xl btn-gradient w-fit mb-4">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-xl">{f.title}</h3>
              <p className="text-slate-500 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="font-heading text-3xl font-bold mb-8">Trending categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Cpu;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.03 }}
                className="min-w-[180px] card-premium p-6 glow-hover cursor-pointer"
              >
                <Icon className="w-8 h-8 text-indigo-500 mb-3" />
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-slate-500">{cat.count} products</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-heading text-3xl font-bold">Featured products</h2>
          <Link to="/products" className="text-indigo-500 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <section id="reviews" className="py-20">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">Trusted by leaders</h2>
        <motion.div
          key={reviewIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mx-auto card-premium p-8 text-center"
        >
          <img src={reviews[reviewIndex].avatar} alt="" className="w-16 h-16 rounded-full mx-auto mb-4" />
          <p className="text-lg italic text-slate-600 dark:text-slate-300">&ldquo;{reviews[reviewIndex].text}&rdquo;</p>
          <p className="font-semibold mt-4">{reviews[reviewIndex].name}</p>
          <p className="text-sm text-slate-500">{reviews[reviewIndex].role}</p>
        </motion.div>
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setReviewIndex(i)}
              className={`h-2.5 rounded-full transition-all ${i === reviewIndex ? 'btn-gradient w-8' : 'w-2.5 bg-slate-300 dark:bg-slate-700'}`}
            />
          ))}
        </div>
      </section>

      <section className="py-20">
        <motion.div
          whileInView={{ scale: [0.98, 1] }}
          viewport={{ once: true }}
          className="rounded-3xl p-12 text-center btn-gradient relative overflow-hidden"
        >
          <h2 className="font-heading text-3xl font-bold text-white relative">Ready to scale your commerce?</h2>
          <p className="text-white/80 mt-2 relative">Join thousands of merchants on EquiCart today.</p>
          <Link to="/register" className="inline-block mt-6 px-8 py-3 bg-white text-indigo-600 rounded-2xl font-semibold hover:scale-105 transition-transform relative">
            Get started free
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
