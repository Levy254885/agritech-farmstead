import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products';
import type { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

export function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ featured: true }).then(setFeatured);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="container-page">
          <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:gap-16 lg:py-28">
            <div className="order-2 md:order-1">
              <p className="text-sm font-medium uppercase tracking-wider text-forest-600">
                Kenyan dairy farm
              </p>
              <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-charcoal-950 sm:text-5xl lg:text-[3.25rem]">
                Quality from the farm.
                <br />
                <span className="text-forest-700">Care in every product.</span>
              </h1>
              <p className="prose-farm mt-6 text-lg">
                Agritech Farmstead produces fresh milk and farm products with
                attention to animal welfare, hygiene, and the people who rely on us every day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/farm" className="btn-primary">Explore Our Farm</Link>
                <Link to="/shop" className="btn-secondary">Shop Farm Products</Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-forest-100">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80"
                  alt="Dairy cows in green pasture"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-forest-100 bg-white section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A farm built on quality and trust
            </h2>
            <p className="prose-farm mx-auto mt-6 text-lg">
              We manage our dairy operation with care — from feeding and animal health
              to milking hygiene — so that the products that leave the farm meet the
              standards our customers expect.
            </p>
            <Link to="/about" className="mt-8 inline-block text-sm font-medium text-forest-700 hover:text-forest-900">
              Learn about Agritech Farmstead →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 section-padding">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">From our farm shop</h2>
              <p className="mt-2 text-charcoal-600">Fresh dairy and farm products available for order.</p>
            </div>
            <Link to="/shop" className="btn-secondary self-start sm:self-auto">View all products</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-forest-100 bg-white">
        <div className="container-page py-14">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Animal care', text: 'Healthy herds and responsible daily management are the foundation of our milk quality.' },
              { title: 'Hygiene & handling', text: 'From milking to packaging, we follow practices designed to protect freshness and safety.' },
              { title: 'Direct to you', text: 'Order from the farm shop via WhatsApp — simple, transparent, and local.' },
            ].map((item) => (
              <div key={item.title} className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-forest-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-800 text-white section-padding">
        <div className="container-page text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to order from the farm?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-forest-100">
            Browse fresh milk, yoghurt, eggs, and more. Delivery and farm pickup available.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-forest-900 transition-colors hover:bg-cream-100"
          >
            Open Farm Shop
          </Link>
        </div>
      </section>
    </>
  );
}
