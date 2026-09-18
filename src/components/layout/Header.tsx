import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { SITE, telUrl } from '@/lib/site';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Product' },
  { to: '/shop', label: 'Shop' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
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
    <header className="sticky top-0 z-50">
      <div className="bg-[#1e88e5] text-white">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <a href={telUrl()} className="inline-flex items-center gap-1.5 hover:underline">
            <Phone className="h-3 w-3" />
            Helpline: {SITE.phoneDisplay}
          </a>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="opacity-90">English</span>
            <Link to="/shop" className="hover:underline">
              Farm Shop
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-white">
        <div className="container-page">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <img
                src={SITE.logoLight}
                alt={SITE.name}
                className="h-9 w-auto"
                width={120}
                height={48}
              />
              <span className="text-base font-bold tracking-tight text-[#1565c0]">
                AGRITECH
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#42a5f5]">
                  Farmstead
                </span>
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
                      'px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-[#1565c0]'
                        : 'text-gray-700 hover:text-[#1565c0]'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Link
                to="/shop"
                className="hidden p-2 text-gray-600 hover:text-[#1565c0] sm:inline-flex"
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.75} />
              </Link>
              <Link
                to="/cart"
                className="relative inline-flex items-center gap-1.5 p-2 text-gray-700 hover:text-[#1565c0]"
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
                <span className="hidden text-xs font-medium sm:inline">
                  Cart
                  {itemCount > 0 ? ` (${itemCount})` : ''}
                </span>
                {itemCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1e88e5] px-1 text-[10px] font-bold text-white sm:hidden">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                className="p-2 text-gray-800 lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-gray-100 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'border-b border-gray-50 py-3 text-base',
                    isActive
                      ? 'font-semibold text-[#1565c0]'
                      : 'font-medium text-gray-700'
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
