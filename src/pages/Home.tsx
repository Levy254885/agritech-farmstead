import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/products';
import type { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

const categories = [
  { label: 'Fresh Milk', to: '/shop?category=milk' },
  { label: 'Yoghurt', to: '/shop?category=yoghurt' },
  { label: 'Eggs', to: '/shop?category=eggs' },
  { label: 'Farm Produce', to: '/shop' },
  { label: 'Dairy', to: '/shop?category=dairy' },
];

const processSteps = [
  {
    num: '01',
    title: 'Care',
    text: 'Healthy herds and attentive daily management form the foundation of everything we produce.',
  },
  {
    num: '02',
    title: 'Feed',
    text: 'Nutrition and pasture management support milk quality from the ground up.',
  },
  {
    num: '03',
    title: 'Milking',
    text: 'Hygienic milking routines protect freshness at every step of the process.',
  },
  {
    num: '04',
    title: 'Quality',
    text: 'Careful handling and cold-chain practices keep products at their best.',
  },
  {
    num: '05',
    title: 'To you',
    text: 'Order from the Farm Shop for delivery or pickup — direct from our farm.',
  },
];

export function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ featured: true }).then(setFeatured);
  }, []);

  return (
    <>
      {/* Cinematic hero — RichLife-inspired structure */}
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <div className="container-page relative z-10">
          <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-20 lg:py-24">
            <div className="order-2 md:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-300">
                Dairy farm · Farm products
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                Your trusted source
                <br />
                for pure dairy
                <br />
                goodness
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-forest-200">
                Fresh milk and farm products from Agritech Farmstead — raised
                with care on our Kenyan farm, handled with hygiene, and ready
                for your table.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className="btn-white">
                  Shop now
                </Link>
                <Link
                  to="/farm"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Explore the farm
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl shadow-2xl md:max-w-none">
                <div className="aspect-[4/3] bg-forest-800">
                  <img
                    src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1000&q=80"
                    alt="Fresh dairy products"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="milk-wave text-milk-soft" aria-hidden="true">
          <svg viewBox="0 0 1440 80" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Category strip */}
      <section className="bg-milk-soft pb-4 pt-2 md:pb-6">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className="rounded-full border border-forest-100 bg-white px-4 py-2 text-sm font-medium text-charcoal-800 shadow-card transition-all hover:border-forest-300 hover:text-forest-900 hover:shadow-soft"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="bg-milk-soft section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Our promise</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Good dairy starts
              <br />
              long before the bottle
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
              From animal care and feeding to milking hygiene and cold handling —
              every step is designed so the products that leave our farm meet
              the standard our customers expect.
            </p>
            <Link to="/about" className="link-arrow mt-8">
              Learn about Agritech Farmstead
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Farm story editorial split */}
      <section className="border-t border-forest-100/60 bg-white section-padding">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-forest-100">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&q=80"
                  alt="Dairy cows in green pasture"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden w-40 overflow-hidden rounded-xl border-4 border-white shadow-soft sm:block md:w-48">
                <div className="aspect-square bg-forest-100">
                  <img
                    src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&q=80"
                    alt="Farm detail"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="lg:pl-4">
              <p className="eyebrow">The farm</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                A closer look at
                <br />
                Agritech Farmstead
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal-600">
                We run a working dairy operation focused on animal welfare,
                clean milking practices, and reliable farm-to-customer supply.
                Our goal is simple: honest products you can trust.
              </p>
              <Link to="/farm" className="link-arrow mt-8">
                Discover our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process journey */}
      <section className="bg-forest-900 text-white section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-400">
              How we work
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              From care to customer
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="text-center lg:text-left">
                <span className="font-display text-3xl font-semibold text-forest-500">
                  {step.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/dairy-farming"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-forest-200"
            >
              Our dairy farming approach
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Farm to table */}
      <section className="bg-milk-soft section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              From our farm
              <br />
              to your table
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-charcoal-600">
              Browse fresh dairy and farm products. Order for delivery or farm
              pickup — confirmed on WhatsApp.
            </p>
            <Link to="/shop" className="btn-primary mt-8">
              Visit the Farm Shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-forest-100/60 bg-white section-padding">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Farm Shop</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Featured products
              </h2>
            </div>
            <Link to="/shop" className="link-arrow">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {featured.length === 0 && (
            <p className="mt-8 text-center text-charcoal-500">
              Products will appear here once available.
            </p>
          )}
        </div>
      </section>

      {/* Sustainability teaser */}
      <section className="bg-forest-50 section-padding">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Sustainability</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Farming with
                <br />
                long-term care
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal-600">
                Responsible animal care, thoughtful resource use, and practices
                that support the land we work on — so the farm can serve
                families for years to come.
              </p>
              <Link to="/sustainability" className="link-arrow mt-8">
                Our approach
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-forest-100">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87cbaa?w=900&q=80"
                alt="Green agricultural landscape"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest-900 text-white">
        <div className="container-page py-20 text-center md:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to order from the farm?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-forest-200">
            Fresh products, transparent ordering, and confirmation on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/shop" className="btn-white">
              Open Farm Shop
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
