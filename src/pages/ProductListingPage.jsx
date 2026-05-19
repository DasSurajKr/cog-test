import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { products, categories } from '../data/mockProducts';
import { useDebounce } from '../hooks/useDebounce';

const PER_PAGE = 8;

export default function ProductListingPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    let list = [...products];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [debouncedSearch, category, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <Breadcrumbs items={[{ label: 'Shop' }]} />
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-3xl font-bold mb-2">
        Product catalog
      </motion.h1>
      <p className="text-slate-500 mb-8">{filtered.length} products available</p>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." className="flex-1" />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2.5 rounded-xl glass outline-none">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button type="button" onClick={() => { setCategory('all'); setPage(1); }} className={`px-4 py-2 rounded-xl text-sm font-medium ${category === 'all' ? 'btn-gradient' : 'glass'}`}>
          All
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" onClick={() => { setCategory(c.id); setPage(1); }} className={`px-4 py-2 rounded-xl text-sm font-medium ${category === c.id ? 'btn-gradient' : 'glass'}`}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginated.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
