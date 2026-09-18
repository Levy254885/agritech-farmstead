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
          p.tags.some((t) => t.includes(q))
      );
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, search, sort]);

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="border-b border-forest-100 bg-white">
        <div className="container-page py-10 md:py-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Farm Shop</h1>
          <p className="mt-2 max-w-2xl text-charcoal-600">
            Fresh dairy and farm products from Agritech Farmstead. Order for delivery or pickup via WhatsApp.
          </p>
        </div>
      </div>

      <div className="container-page py-8 md:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-forest-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              aria-label="Search products"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-forest-200 bg-white px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-forest-200 bg-white px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
              aria-label="Sort products"
            >
              <option value="name">Name A–Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-16 text-center text-charcoal-500">Loading products…</div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-lg border border-forest-100 bg-white p-12 text-center">
            <p className="text-charcoal-700">No products match your search.</p>
            <button
              type="button"
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="btn-secondary mt-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
