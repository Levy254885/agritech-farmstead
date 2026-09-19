import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, useDemoData } from '@/lib/firebase';
import { cn } from '@/lib/utils';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/content', label: 'Content' },
  { to: '/admin/blogs', label: 'Blog' },
];

export function AdminLayout() {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (useDemoData || !auth) {
      const demo = sessionStorage.getItem('agritech-admin-demo');
      if (demo) {
        setAllowed(true);
      } else {
        navigate('/admin/login');
      }
      setReady(true);
      return;
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAllowed(true);
      } else {
        navigate('/admin/login');
      }
      setReady(true);
    });
    return unsub;
  }, [navigate]);

  async function handleSignOut() {
    if (useDemoData || !auth) {
      sessionStorage.removeItem('agritech-admin-demo');
    } else {
      await signOut(auth);
    }
    navigate('/admin/login');
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal-100 text-charcoal-500">
        Loading…
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-charcoal-100">
      <header className="border-b border-charcoal-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="font-semibold text-charcoal-900">
              Agritech Admin
            </Link>
            <nav className="hidden gap-1 sm:flex">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded px-3 py-1.5 text-sm font-medium',
                      isActive
                        ? 'bg-forest-50 text-forest-800'
                        : 'text-charcoal-600 hover:bg-charcoal-50'
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-charcoal-500 hover:text-charcoal-800">
              View site
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-charcoal-500 hover:text-charcoal-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
