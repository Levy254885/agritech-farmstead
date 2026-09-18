import { Link } from 'react-router-dom';
import { SITE, whatsappUrl, telUrl } from '@/lib/site';

const farmLinks = [
  { to: '/about', label: 'About us' },
  { to: '/dairy-farming', label: 'Dairy farming' },
  { to: '/farm', label: 'The farm' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/blog', label: 'Journal' },
];

const shopLinks = [
  { to: '/shop', label: 'Farm Shop' },
  { to: '/products', label: 'Our products' },
  { to: '/cart', label: 'Cart' },
  { to: '/contact', label: 'Contact' },
];

const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/shipping-delivery', label: 'Delivery' },
  { to: '/returns-refunds', label: 'Returns' },
];

export function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-100">
      <div className="container-page">
        <div className="border-b border-white/10 py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  src={SITE.logoLight}
                  alt={SITE.name}
                  className="h-11 w-auto brightness-0 invert"
                  width={140}
                  height={52}
                />
                <span className="font-display text-xl font-semibold tracking-tight text-white">
                  Agritech Farmstead
                </span>
              </Link>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-forest-200">
                Quality dairy and farm products from our Kenyan farm — raised
                with care, handled with hygiene, and delivered with trust.
              </p>
              <p className="mt-6 text-sm text-forest-300">
                <a href={telUrl()} className="font-medium text-white hover:underline">
                  {SITE.phoneDisplay}
                </a>
                <span className="mx-2 text-forest-500">·</span>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-400">
                  The farm
                </p>
                <ul className="mt-4 space-y-2.5">
                  {farmLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-forest-100 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-400">
                  Shop
                </p>
                <ul className="mt-4 space-y-2.5">
                  {shopLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-forest-100 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-400">
                  Legal
                </p>
                <ul className="mt-4 space-y-2.5">
                  {legalLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-forest-100 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-forest-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Agritech Farmstead. All rights reserved.</p>
          <p className="text-forest-500">{SITE.location !== '[Farm Location]' ? SITE.location : 'Kenya'}</p>
        </div>
      </div>
    </footer>
  );
}
