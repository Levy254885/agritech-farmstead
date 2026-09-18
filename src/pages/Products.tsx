import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '@/lib/products';
import type { Product, Category } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
      setProducts(p);
      setCategories(c);
    });
  }, []);

  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Our products</h1>
          <p className="prose-farm mt-4 max-w-2xl text-lg">
            Dairy and farm products produced with care. Browse the full catalogue in the Farm Shop to order.
          </p>
          <Link to="/shop" className="btn-primary mt-8 inline-flex">
            Open Farm Shop
          </Link>
        </div>
      </section>

      {categories.map((cat) => {
        const catProducts = products.filter(
          (p) => p.categoryId === cat.id || p.category === cat.name
        );
        if (catProducts.length === 0) return null;
        return (
          <section key={cat.id} className="section-padding border-b border-forest-100">
            <div className="container-page">
              <h2 className="text-2xl font-semibold tracking-tight">{cat.name}</h2>
              {cat.description && (
                <p className="mt-2 text-charcoal-600">{cat.description}</p>
              )}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {catProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
