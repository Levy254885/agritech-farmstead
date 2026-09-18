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
  { to: '/shop', label: 'Farm Shop' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-forest-100/80 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <img
              src={SITE.logoLight}
              alt={SITE.name}
              className="h-9 w-auto md:h-10"
              width={120}
              height={48}
            />
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-forest-900 sm:block md:text-base">
              Agritech Farmstead
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
                    'relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors',
                    isActive
                      ? 'text-forest-900'
                      : 'text-charcoal-600 hover:text-forest-800'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-forest-700" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/cart"
              className="relative rounded-full p-2.5 text-charcoal-800 transition-colors hover:bg-forest-50 hover:text-forest-900"
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-800 px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="rounded-full p-2.5 text-charcoal-800 transition-colors hover:bg-forest-50 lg:hidden"
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
          'fixed inset-0 top-16 z-40 bg-white transition-all duration-300 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
      >
        <nav className="container-page flex h-full flex-col gap-1 py-8" aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3.5 text-lg font-medium transition-colors',
                  isActive
                    ? 'bg-forest-50 text-forest-900'
                    : 'text-charcoal-800 hover:bg-forest-50'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-auto border-t border-forest-100 pt-6">
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Visit Farm Shop
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
