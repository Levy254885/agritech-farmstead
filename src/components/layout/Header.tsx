import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dairy-farming', label: 'Dairy Farming' },
  { to: '/products', label: 'Products' },
  { to: '/farm', label: 'Farm' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/shop', label: 'Farm Shop' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <header className="sticky top-0 z-50 border-b border-forest-100 bg-cream-50/95 backdrop-blur-sm">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between md:h-18">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src={SITE.logoLight}
              alt={SITE.name}
              className="h-10 w-auto md:h-11"
              width={120}
              height={48}
            />
            <span className="hidden sm:block font-display text-base font-semibold tracking-tight text-forest-800 md:text-lg">
              Agritech Farmstead
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-forest-50 text-forest-800'
                      : 'text-charcoal-700 hover:bg-forest-50 hover:text-forest-800'
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
              className="relative rounded-md p-2 text-charcoal-800 transition-colors hover:bg-forest-50 hover:text-forest-800"
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-700 px-1 text-[10px] font-medium text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="rounded-md p-2 text-charcoal-800 xl:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-forest-100 bg-cream-50 xl:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-3 text-base font-medium',
                    isActive
                      ? 'bg-forest-50 text-forest-800'
                      : 'text-charcoal-800 hover:bg-forest-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
