import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dairy-farming', label: 'Dairy' },
  { to: '/farm', label: 'Farm' },
  { to: '/products', label: 'Products' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/shop', label: 'Farm Shop' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled && 'shadow-[0_1px_0_0_rgba(30,58,47,0.08)]'
      )}
    >
      <div className="container-page">
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <img
              src={SITE.logoLight}
              alt={SITE.name}
              className="h-9 w-auto md:h-10"
              width={120}
              height={48}
            />
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-forest-900 sm:block">
              Agritech
              <span className="block text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-forest-600">
                Farmstead
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-[13px] font-medium transition-colors',
                    isActive
                      ? 'text-forest-900'
                      : 'text-charcoal-600 hover:text-forest-800'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/shop"
              className="hidden rounded-full p-2 text-charcoal-700 transition-colors hover:bg-forest-50 hover:text-forest-900 sm:inline-flex"
              aria-label="Search products"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </Link>

            <Link
              to="/cart"
              className="relative rounded-full p-2 text-charcoal-700 transition-colors hover:bg-forest-50 hover:text-forest-900"
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-800 px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <Link
              to="/shop"
              className="ml-1 hidden rounded-full bg-forest-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-900 sm:inline-flex"
            >
              Shop Now
            </Link>

            <button
              type="button"
              className="rounded-full p-2 text-charcoal-800 transition-colors hover:bg-forest-50 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 top-[4.25rem] z-40 bg-white transition-all duration-300 lg:hidden',
          open
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        )}
      >
        <nav className="container-page flex h-full flex-col gap-0.5 py-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-4 py-3.5 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-forest-50 text-forest-900'
                    : 'text-charcoal-800 hover:bg-forest-50'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-6 border-t border-forest-100 pt-6">
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-900"
            >
              Shop Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
