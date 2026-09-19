import { useEffect, useState, type FormEvent } from 'react';
import {
  getSiteContent,
  saveSiteContent,
  type SiteContent,
  DEFAULT_CONTENT,
} from '@/lib/content';
import { isCloudinaryConfigured, uploadImage, resolveImageUrl } from '@/lib/cloudinary';
import { useDemoData, isFirebaseConfigured } from '@/lib/firebase';

type FieldKey = keyof SiteContent;

const SECTIONS: {
  title: string;
  fields: { key: FieldKey; label: string; rows?: number; image?: boolean }[];
}[] = [
  {
    title: 'Homepage — Hero',
    fields: [
      { key: 'heroEyebrow', label: 'Eyebrow label' },
      { key: 'heroTitle', label: 'Headline (line break between lines)', rows: 2 },
      { key: 'heroSubtitle', label: 'Supporting text', rows: 3 },
      { key: 'heroImage', label: 'Hero image URL', image: true },
    ],
  },
  {
    title: 'Homepage — Philosophy',
    fields: [
      { key: 'philosophyTitle', label: 'Title' },
      { key: 'philosophyBody', label: 'Body', rows: 3 },
    ],
  },
  {
    title: 'Homepage — Farm intro',
    fields: [
      { key: 'farmIntroTitle', label: 'Title' },
      { key: 'farmIntroBody', label: 'Body', rows: 4 },
      { key: 'farmIntroImage', label: 'Image URL', image: true },
    ],
  },
  {
    title: 'About page',
    fields: [
      { key: 'aboutTitle', label: 'Title' },
      { key: 'aboutBody', label: 'Body', rows: 5 },
      { key: 'aboutImage', label: 'Image URL', image: true },
    ],
  },
  {
    title: 'Farm page',
    fields: [
      { key: 'farmPageTitle', label: 'Title' },
      { key: 'farmPageBody', label: 'Body', rows: 4 },
    ],
  },
  {
    title: 'Livestock / practices page',
    fields: [
      { key: 'practicesTitle', label: 'Title' },
      { key: 'practicesBody', label: 'Body', rows: 4 },
    ],
  },
  {
    title: 'Sustainability page',
    fields: [
      { key: 'sustainabilityTitle', label: 'Title' },
      { key: 'sustainabilityBody', label: 'Body', rows: 4 },
    ],
  },
  {
    title: 'Products page',
    fields: [
      { key: 'productsPageTitle', label: 'Title' },
      { key: 'productsPageBody', label: 'Body', rows: 3 },
    ],
  },
  {
    title: 'Shop page',
    fields: [
      { key: 'shopTitle', label: 'Title' },
      { key: 'shopBody', label: 'Body', rows: 2 },
    ],
  },
  {
    title: 'Contact & business details',
    fields: [
      { key: 'contactBlurb', label: 'Contact intro', rows: 2 },
      { key: 'contactEmail', label: 'Email' },
      { key: 'contactPhone', label: 'Phone (display)' },
      { key: 'contactWhatsapp', label: 'WhatsApp (display)' },
      { key: 'contactLocation', label: 'Location' },
      { key: 'contactHours', label: 'Business hours' },
    ],
  },
  {
    title: 'Footer',
    fields: [{ key: 'footerTagline', label: 'Footer tagline' }],
  },
];

export function AdminContent() {
  const [form, setForm] = useState<SiteContent>({ ...DEFAULT_CONTENT });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

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
        'Content saved. Refresh the public site. If changes do not appear, set VITE_USE_DEMO_DATA=false on Vercel and redeploy.'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function uploadFor(key: FieldKey, file: File | null) {
    if (!file) return;
    setUploadingKey(key);
    setError('');
    try {
      const r = await uploadImage(file);
      setForm((f) => ({ ...f, [key]: r.secure_url }));
      setMessage(`Image uploaded for ${key}. Click Save all content.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingKey(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-charcoal-500">Loading content…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-charcoal-900">Website content</h1>
      <p className="mt-1 text-sm text-charcoal-500">
        Edit homepage, pages, and contact details. Changes appear on the public site after save.
      </p>

      <div className="mt-4 border border-charcoal-200 bg-charcoal-50 px-4 py-3 text-xs text-charcoal-600">
        <p>
          <strong>Mode:</strong>{' '}
          {useDemoData
            ? 'Demo (local only — set VITE_USE_DEMO_DATA=false on Vercel for live CMS)'
            : isFirebaseConfigured
              ? 'Live Firebase'
              : 'Firebase not configured'}
        </p>
        <p className="mt-1">
          <strong>Cloudinary:</strong>{' '}
          {isCloudinaryConfigured() ? 'Configured' : 'Not configured — paste image URLs'}
        </p>
      </div>

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

      <form onSubmit={onSubmit} className="mt-6 max-w-3xl space-y-10">
        {SECTIONS.map((section) => (
          <fieldset
            key={section.title}
            className="space-y-4 border border-charcoal-200 bg-white p-6"
          >
            <legend className="px-1 text-base font-semibold text-charcoal-900">
              {section.title}
            </legend>
            {section.fields.map((field) => {
              const value = String(form[field.key] ?? '');
              return (
                <div key={field.key}>
                  <label className="block text-sm">
                    <span className="font-medium text-charcoal-700">{field.label}</span>
                    {field.rows ? (
                      <textarea
                        rows={field.rows}
                        className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                        value={value}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [field.key]: e.target.value }))
                        }
                      />
                    ) : (
                      <input
                        className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                        value={value}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [field.key]: e.target.value }))
                        }
                      />
                    )}
                  </label>
                  {field.image && (
                    <div className="mt-2 space-y-2">
                      {value && (
                        <img
                          src={resolveImageUrl(value)}
                          alt=""
                          className="h-28 w-auto max-w-full object-cover border border-charcoal-200"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingKey === field.key}
                        onChange={(e) =>
                          uploadFor(field.key, e.target.files?.[0] || null)
                        }
                      />
                      {uploadingKey === field.key && (
                        <span className="text-xs text-charcoal-500">Uploading…</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </fieldset>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="bg-forest-900 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save all content'}
        </button>
      </form>
    </div>
  );
}
