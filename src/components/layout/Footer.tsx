import { Link } from 'react-router-dom';
import { SITE, whatsappUrl, telUrl } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-100">
      <div className="container-page section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={SITE.logo}
                alt={SITE.name}
                className="h-14 w-auto"
                width={80}
                height={70}
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-forest-200">
              A Kenyan dairy farm focused on quality milk and farm products,
              produced with care for animals, land, and the people we serve.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dairy-farming" className="hover:text-white transition-colors">
                  Dairy Farming
                </Link>
              </li>
              <li>
                <Link to="/farm" className="hover:text-white transition-colors">
                  Our Farm
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Farm Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Farm Shop
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-forest-200">
              <li>{SITE.location}</li>
              <li>
                <a href={telUrl()} className="hover:text-white transition-colors">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {SITE.phoneDisplay}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="text-forest-100 hover:text-white transition-colors"
                >
                  Contact form →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-forest-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-forest-300">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-forest-300">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/shipping-delivery" className="hover:text-white">
              Shipping & Delivery
            </Link>
            <Link to="/returns-refunds" className="hover:text-white">
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
