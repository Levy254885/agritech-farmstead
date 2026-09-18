import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, useDemoData } from '@/lib/firebase';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (useDemoData || !auth) {
        if (email && password) {
          sessionStorage.setItem('agritech-admin-demo', '1');
          navigate('/admin');
          return;
        }
        setError('Enter email and password (demo mode).');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch {
      setError('Invalid credentials or access denied.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-950 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-xl font-semibold text-charcoal-950">Admin sign in</h1>
        <p className="mt-1 text-sm text-charcoal-500">Agritech Farmstead dashboard</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-charcoal-200 px-3 py-2 text-sm focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-charcoal-200 px-3 py-2 text-sm focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-forest-800 py-2.5 text-sm font-medium text-white hover:bg-forest-900 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        {useDemoData && (
          <p className="mt-4 text-center text-xs text-charcoal-400">
            Demo mode: any email/password works for preview.
          </p>
        )}
      </div>
    </div>
  );
}
