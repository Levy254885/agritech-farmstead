import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/products';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

const processSteps = [
  {
    num: '01',
    title: 'Care',
    text: 'Healthy and well-cared-for cows.',
    image:
      'https://images.unsplash.com/photo-1570042225831-ce3b743073dd?w=400&q=80',
  },
  {
    num: '02',
    title: 'Feed',
    text: 'Nutritious feed for better milk.',
    image:
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80',
  },
  {
    num: '03',
    title: 'Milking',
    text: 'Clean and modern systems.',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80',
  },
  {
    num: '04',
    title: 'Quality',
    text: 'Strict checks for pure milk.',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
  },
  {
    num: '05',
    title: 'Farm to Customer',
    text: 'Fresh products direct to you.',
    image:
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80',
  },
];

const values = [
  {
    num: '01',
    title: 'Care',
    text: 'For our cows, our people and our land.',
  },
  {
    num: '02',
    title: 'Quality',
    text: 'No shortcuts. Just the best.',
  },
  {
    num: '03',
    title: 'Responsibility',
    text: 'For today and tomorrow.',
  },
  {
    num: '04',
    title: 'Freshness',
    text: 'Farm to table. Always.',
  },
];

const shopCategories = [
  { label: 'Milk', to: '/shop?category=milk' },
  { label: 'Yoghurt', to: '/shop?category=yoghurt' },
  { label: 'Mala', to: '/shop?category=mala' },
  { label: 'Butter', to: '/shop?category=butter' },
  { label: 'Cheese', to: '/shop?category=cheese' },
  { label: 'Other Products', to: '/shop' },
];

export function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProducts({ featured: true }).then(setFeatured);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[78vh] overflow-hidden bg-forest-900 md:min-h-[85vh]">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1800&q=85"
          alt="Dairy cows in green pasture at Agritech Farmstead"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        <div className="container-page relative z-10 flex min-h-[78vh] flex-col justify-center py-20 md:min-h-[85vh] md:py-24">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              Dairy farm · Farm products
            </p>
            <h1 className="mt-4 font-display text-[2.75rem] font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem]">
              From the farm,
              <br />
              with care.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85">
              At Agritech Farmstead, we believe in better dairy. Healthy cows,
              sustainable farming and fresh products for healthier lives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/farm"
                className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-900"
              >
                Explore the farm
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
              >
                Shop products
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <p className="absolute bottom-10 right-6 hidden font-display text-lg italic text-white/70 md:block lg:right-12 lg:text-xl">
            Fresh milk. Real care.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-600">
                Our philosophy
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.15] tracking-tight text-charcoal-950 sm:text-4xl md:text-[2.75rem]">
                Good dairy starts
                <br />
                long before the bottle.
              </h2>
            </div>
            <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
              <p className="text-[15px] leading-relaxed text-charcoal-600">
                It starts with healthy cows, quality feed, clean environments
                and a team that cares. At Agritech Farmstead, we combine
                traditional farming values with modern practices to bring you
                the freshest, safest and highest quality dairy products.
              </p>
              <div className="mt-6 h-px w-12 bg-forest-300" />
            </div>
          </div>
        </div>
      </section>

      {/* FARM STORY */}
      <section className="bg-milk-soft py-16 md:py-24">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="relative lg:col-span-5">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-forest-100">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80"
                  alt="Pasture and farm buildings"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 right-4 w-[42%] overflow-hidden rounded-sm border-4 border-white shadow-soft sm:right-8">
                <div className="aspect-[3/4] bg-forest-100">
                  <img
                    src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&q=80"
                    alt="Farmer with dairy cow"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="pt-10 lg:col-span-4 lg:px-4 lg:pt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-600">
                01 — The farm
              </p>
              <h2 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-charcoal-950 sm:text-3xl">
                A closer look at
                <br />
                Agritech Farmstead.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
                Our farm is home to healthy cows, modern facilities and a
                dedicated team. We're committed to sustainable farming and
                producing high-quality dairy products for our community and
                beyond.
              </p>
              <Link
                to="/farm"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 underline-offset-4 transition-colors hover:text-forest-950 hover:underline"
              >
                Discover our story
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-sm bg-forest-900 lg:col-span-3">
              <div className="aspect-[3/4] md:aspect-auto md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=80"
                  alt="Fresh milk being poured"
                  className="h-full w-full object-cover opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display text-lg font-medium leading-snug text-white">
                    Quality from
                    <br />
                    the ground up.
                  </p>
                  <Link
                    to="/dairy-farming"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAIRY PROCESS */}
      <section className="bg-forest-900 py-16 text-white md:py-20">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="mb-6 aspect-[4/3] overflow-hidden rounded-sm bg-forest-800">
                <img
                  src="https://images.unsplash.com/photo-1570042225831-ce3b743073dd?w=700&q=80"
                  alt="Healthy dairy cows"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-400">
                Our dairy farming
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Healthy cows.
                <br />
                Better milk.
              </h2>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-forest-200">
                We focus on animal care, balanced nutrition, clean facilities
                and strict hygiene practices — because great milk starts with
                healthy cows.
              </p>
              <Link
                to="/dairy-farming"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Learn about our process
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
                {processSteps.map((step) => (
                  <div key={step.num} className="group">
                    <div className="aspect-square overflow-hidden rounded-sm bg-forest-800">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-forest-500">
                      {step.num}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-forest-300">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS + FARM SHOP */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-600">
                Farm products
              </p>
              <h2 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-charcoal-950 sm:text-3xl">
                From our farm
                <br />
                to your table.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
                Fresh, natural and full of goodness. Our dairy products are made
                with care and delivered straight from our farm to your home.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
              >
                Visit the Farm Shop
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="mb-6 flex items-end justify-between">
                <h3 className="font-display text-lg font-medium text-charcoal-950">
                  Featured Products
                </h3>
                <Link
                  to="/shop"
                  className="text-sm font-medium text-forest-700 hover:text-forest-900"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                {featured.slice(0, 4).map((p) => {
                  const available =
                    p.available !== false && p.stockQuantity > 0;
                  return (
                    <article key={p.id} className="group">
                      <Link
                        to={`/shop/${p.slug}`}
                        className="block overflow-hidden rounded-sm bg-forest-50"
                      >
                        <div className="aspect-square">
                          {p.images?.[0] ? (
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-forest-300">
                              No image
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/shop/${p.slug}`}>
                            <h4 className="text-sm font-semibold text-charcoal-950 group-hover:text-forest-800">
                              {p.name}
                            </h4>
                          </Link>
                          <p className="mt-0.5 text-xs text-charcoal-500">
                            {p.unit}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-charcoal-950">
                            {formatCurrency(p.price)}
                          </p>
                          <p className="mt-0.5 text-[11px] text-forest-600">
                            {available ? 'In Stock' : 'Out of stock'}
                          </p>
                        </div>
                        {available && (
                          <button
                            type="button"
                            onClick={() => addItem(p)}
                            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-800 text-white transition-colors hover:bg-forest-900"
                            aria-label={`Add ${p.name} to cart`}
                          >
                            <span className="text-lg leading-none">+</span>
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              {featured.length === 0 && (
                <p className="text-sm text-charcoal-500">
                  Products will appear here once available.
                </p>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-sm bg-milk-soft">
                <div className="aspect-[4/3] overflow-hidden bg-forest-100">
                  <img
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700&q=80"
                    alt="Fresh dairy products on table"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-charcoal-950">
                    The Farm Shop
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    Fresh products, directly from Agritech Farmstead.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-900"
                  >
                    Shop all products
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <ul className="mt-6 space-y-2 border-t border-forest-100 pt-5">
                    {shopCategories.map((c) => (
                      <li key={c.label}>
                        <Link
                          to={c.to}
                          className="flex items-center justify-between text-sm text-charcoal-700 transition-colors hover:text-forest-800"
                        >
                          {c.label}
                          <ArrowRight className="h-3.5 w-3.5 text-charcoal-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-t border-forest-100 bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="overflow-hidden rounded-sm lg:col-span-5">
              <div className="aspect-[4/3] bg-forest-100">
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87cbaa?w=900&q=80"
                  alt="Sunrise over farm landscape"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-600">
                Our values
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-charcoal-950 sm:text-4xl">
                More than just dairy.
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-charcoal-600">
                We are committed to sustainable farming, responsible practices
                and a healthier future for our community and the environment.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {values.map((v) => (
                  <div key={v.num}>
                    <p className="text-[11px] font-semibold tracking-wider text-forest-500">
                      {v.num}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-medium text-charcoal-950">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal-500">
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/sustainability"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-900"
              >
                Our sustainability
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
