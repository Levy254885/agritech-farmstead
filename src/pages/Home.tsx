import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

const processSteps = [
  {
    num: '01',
    title: 'Animal care',
    text: 'Daily management focused on herd health and welfare.',
  },
  {
    num: '02',
    title: 'Feeding',
    text: 'Balanced nutrition to support milk quality.',
  },
  {
    num: '03',
    title: 'Milking',
    text: 'Hygienic routines and clean facilities.',
  },
  {
    num: '04',
    title: 'Quality checks',
    text: 'Handling practices that protect freshness and safety.',
  },
  {
    num: '05',
    title: 'Delivery',
    text: 'Orders confirmed and fulfilled from the farm.',
  },
];

export function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProducts({ featured: true }).then(setFeatured);
  }, []);

  return (
    <>
      <section className="border-b border-charcoal-200 bg-white">
        <div className="container-page">
          <div className="grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Dairy farm · Kenya
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-charcoal-900 sm:text-5xl">
                From the farm, with care.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal-600">
                Agritech Farmstead produces fresh milk and farm products through
                responsible animal care, clean handling, and direct supply to
                customers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/farm" className="btn-primary">
                  About the farm
                </Link>
                <Link to="/shop" className="btn-secondary">
                  Farm shop
                </Link>
              </div>
            </div>
            <div>
              <div className="aspect-[4/3] overflow-hidden bg-charcoal-100">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80"
                  alt="Dairy cows grazing on pasture"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl leading-snug text-charcoal-900 sm:text-4xl">
              Good dairy starts long before the bottle.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-charcoal-600">
              Quality depends on healthy animals, proper feed, clean milking
              practices, and careful handling. These standards guide how we
              work every day.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal-200 bg-white py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="aspect-[5/4] overflow-hidden bg-charcoal-100">
              <img
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1000&q=80"
                alt="Farm worker with dairy cattle"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                The farm
              </p>
              <h2 className="mt-3 font-display text-3xl leading-snug text-charcoal-900">
                Agritech Farmstead
              </h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal-600">
                We operate a working dairy farm focused on animal welfare,
                hygiene, and reliable supply. Products are available for order
                through the Farm Shop, with confirmation by phone or WhatsApp.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-charcoal-700">
                <li className="flex gap-2">
                  <span className="text-charcoal-400">—</span>
                  Dairy herd management
                </li>
                <li className="flex gap-2">
                  <span className="text-charcoal-400">—</span>
                  Fresh milk and dairy products
                </li>
                <li className="flex gap-2">
                  <span className="text-charcoal-400">—</span>
                  Farm pickup and delivery options
                </li>
              </ul>
              <Link
                to="/about"
                className="mt-8 inline-block text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
              >
                Read more about us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal-200 bg-charcoal-50 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
              How we work
            </p>
            <h2 className="mt-3 font-display text-3xl leading-snug text-charcoal-900">
              From the herd to the customer
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              A clear process supports consistency and trust in every product
              that leaves the farm.
            </p>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.num}>
                <p className="text-sm font-semibold text-charcoal-400">
                  {step.num}
                </p>
                <h3 className="mt-2 text-base font-semibold text-charcoal-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Link
              to="/dairy-farming"
              className="text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
            >
              Dairy farming practices
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal-200 bg-white py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500">
                Farm shop
              </p>
              <h2 className="mt-2 font-display text-3xl text-charcoal-900">
                Available products
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
            >
              View all products
            </Link>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 4).map((p) => {
              const available = p.available !== false && p.stockQuantity > 0;
              return (
                <article key={p.id} className="border border-charcoal-200 bg-white">
                  <Link to={`/shop/${p.slug}`} className="block">
                    <div className="aspect-square overflow-hidden bg-charcoal-50">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-charcoal-400">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="border-t border-charcoal-200 p-4">
                    <Link to={`/shop/${p.slug}`}>
                      <h3 className="text-sm font-semibold text-charcoal-900 hover:underline">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs text-charcoal-500">{p.unit}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-charcoal-900">
                        {formatCurrency(p.price)}
                      </p>
                      <span className="text-xs text-charcoal-500">
                        {available ? 'In stock' : 'Out of stock'}
                      </span>
                    </div>
                    {available && (
                      <button
                        type="button"
                        onClick={() => addItem(p)}
                        className="mt-3 w-full border border-charcoal-300 py-2 text-xs font-semibold text-charcoal-800 hover:border-charcoal-500 hover:bg-charcoal-50"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {featured.length === 0 && (
            <p className="mt-8 text-sm text-charcoal-500">
              Products will be listed here when available.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-charcoal-200 bg-white py-20 md:py-24">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-2xl text-charcoal-900 sm:text-3xl">
                Order from the farm
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-600">
                Browse the Farm Shop, add items to your cart, or contact us
                directly to place an order. We confirm every order before
                fulfilment.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-end">
              <Link to="/shop" className="btn-primary text-center">
                Open Farm Shop
              </Link>
              <Link to="/contact" className="btn-secondary text-center">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
