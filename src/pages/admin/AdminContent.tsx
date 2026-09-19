import { useEffect, useState, type FormEvent } from 'react';
import {
  getSiteContent,
  saveSiteContent,
  type SiteContent,
  DEFAULT_CONTENT,
} from '@/lib/content';

export function AdminContent() {
  const [form, setForm] = useState<SiteContent>({ ...DEFAULT_CONTENT });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSiteContent()
      .then(setForm)
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await saveSiteContent(form);
      setMessage(
        'Website content saved. Public pages using this content will reflect changes on next load.'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  function field(
    key: keyof SiteContent,
    label: string,
    opts?: { rows?: number; hint?: string }
  ) {
    const value = String(form[key] ?? '');
    return (
      <label className="block text-sm">
        <span className="font-medium text-charcoal-700">{label}</span>
        {opts?.hint && (
          <span className="ml-2 text-xs text-charcoal-400">{opts.hint}</span>
        )}
        {opts?.rows ? (
          <textarea
            rows={opts.rows}
            className="mt-1 w-full border border-charcoal-300 px-3 py-2"
            value={value}
            onChange={(e) =>
              setForm((f) => ({ ...f, [key]: e.target.value }))
            }
          />
        ) : (
          <input
            className="mt-1 w-full border border-charcoal-300 px-3 py-2"
            value={value}
            onChange={(e) =>
              setForm((f) => ({ ...f, [key]: e.target.value }))
            }
          />
        )}
      </label>
    );
  }

  if (loading) {
    return <p className="text-sm text-charcoal-500">Loading content…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-charcoal-900">
        Website content
      </h1>
      <p className="mt-1 text-sm text-charcoal-500">
        Edit homepage and key copy. Saved to Firebase (or local demo storage).
      </p>

      {message && (
        <p className="mt-4 border border-forest-200 bg-forest-50 px-3 py-2 text-sm text-forest-800">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-6 max-w-3xl space-y-5 border border-charcoal-200 bg-white p-6"
      >
        <h2 className="text-base font-semibold text-charcoal-900">Hero</h2>
        {field('heroEyebrow', 'Eyebrow label')}
        {field('heroTitle', 'Headline', {
          rows: 2,
          hint: 'Use a line break between lines',
        })}
        {field('heroSubtitle', 'Supporting text', { rows: 3 })}

        <h2 className="pt-4 text-base font-semibold text-charcoal-900">
          Philosophy
        </h2>
        {field('philosophyTitle', 'Title')}
        {field('philosophyBody', 'Body', { rows: 3 })}

        <h2 className="pt-4 text-base font-semibold text-charcoal-900">
          Farm intro
        </h2>
        {field('farmIntroTitle', 'Title')}
        {field('farmIntroBody', 'Body', { rows: 4 })}

        <h2 className="pt-4 text-base font-semibold text-charcoal-900">About</h2>
        {field('aboutTitle', 'Title')}
        {field('aboutBody', 'Body', { rows: 4 })}

        <h2 className="pt-4 text-base font-semibold text-charcoal-900">
          Contact
        </h2>
        {field('contactBlurb', 'Contact blurb', { rows: 2 })}

        <button
          type="submit"
          disabled={saving}
          className="bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save content'}
        </button>
      </form>
    </div>
  );
}
