import { Link } from 'react-router-dom';
import { SITE, whatsappUrl, telUrl } from '@/lib/site';

const farmLinks = [
  { to: '/about', label: 'About' },
  { to: '/dairy-farming', label: 'Livestock' },
  { to: '/farm', label: 'The farm' },
  { to: '/sustainability', label: 'Sustainability' },
];

const shopLinks = [
  { to: '/shop', label: 'Farm Shop' },
  { to: '/products', label: 'Products' },
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
    <footer className="border-t border-charcoal-200 bg-charcoal-50">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="text-sm font-semibold text-charcoal-900">
              Agritech Farmstead
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal-600">
              Livestock and farm products. Orders confirmed by phone or
              WhatsApp.
            </p>
            <p className="mt-4 text-sm text-charcoal-700">
              <a href={telUrl()} className="hover:underline">
                Call {SITE.phoneDisplay}
              </a>
              <span className="mx-2 text-charcoal-400">·</span>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Farm
              </p>
              <ul className="mt-3 space-y-2">
                {farmLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-charcoal-700 hover:text-charcoal-900 hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Shop
              </p>
              <ul className="mt-3 space-y-2">
                {shopLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-charcoal-700 hover:text-charcoal-900 hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Legal
              </p>
              <ul className="mt-3 space-y-2">
                {legalLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-charcoal-700 hover:text-charcoal-900 hover:underline"
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
      <div className="border-t border-charcoal-200">
        <div className="container-page flex flex-col gap-1 py-4 text-xs text-charcoal-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Agritech Farmstead</p>
          <p>Kenya</p>
        </div>
      </div>
    </footer>
  );
}
