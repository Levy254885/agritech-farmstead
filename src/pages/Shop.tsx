import { useEffect, useMemo, useState } from 'react';
import { getProducts, getCategories } from '@/lib/products';
import type { Product, Category } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Search } from 'lucide-react';

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('name');

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'all') {
      list = list.filter(
        (p) => p.categoryId === category || p.category === category
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.includes(q)))
      );
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, search, sort]);

  return (
    <div className="min-h-screen bg-milk-soft">
      <div className="border-b border-forest-100/80 bg-white">
        <div className="container-page py-14 md:py-18">
          <p className="eyebrow">Order direct from the farm</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            The Farm Shop
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-charcoal-600">
            Fresh dairy and farm products. Add to cart or order on WhatsApp —
            we confirm every order personally.
          </p>
        </div>
      </div>

      <div className="container-page py-10 md:py-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-forest-100 bg-white py-3 pl-11 pr-5 text-sm shadow-card transition-shadow focus:border-forest-300 focus:outline-none focus:ring-2 focus:ring-forest-100"
              aria-label="Search products"
            />
          </div>
          <div className="flex flex-wrap gap-2.5">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-forest-100 bg-white px-4 py-2.5 text-sm shadow-card focus:border-forest-300 focus:outline-none"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-forest-100 bg-white px-4 py-2.5 text-sm shadow-card focus:border-forest-300 focus:outline-none"
              aria-label="Sort products"
            >
              <option value="name">Name A–Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-20 text-center text-charcoal-500">Loading products…</div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-forest-100 bg-white p-12 text-center">
            <p className="text-charcoal-700">No products match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
              className="btn-secondary mt-5"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
