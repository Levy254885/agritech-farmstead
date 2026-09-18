import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
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
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-200 bg-white">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <img
              src={SITE.logoLight}
              alt={SITE.name}
              className="h-9 w-auto"
              width={120}
              height={48}
            />
            <span className="hidden text-sm font-semibold text-charcoal-900 sm:block">
              Agritech Farmstead
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'font-semibold text-charcoal-900'
                      : 'font-medium text-charcoal-600 hover:text-charcoal-900'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/cart"
              className="relative p-2 text-charcoal-700 hover:text-charcoal-900"
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-900 px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
            <Link
              to="/shop"
              className="ml-2 hidden border border-forest-900 bg-forest-900 px-4 py-2 text-xs font-semibold text-white hover:bg-forest-800 sm:inline-flex"
            >
              Shop Now
            </Link>
            <button
              type="button"
              className="p-2 text-charcoal-800 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-charcoal-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'border-b border-charcoal-100 py-3 text-base',
                    isActive
                      ? 'font-semibold text-charcoal-900'
                      : 'font-medium text-charcoal-700'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="mt-4 border border-forest-900 bg-forest-900 py-3 text-center text-sm font-semibold text-white"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
