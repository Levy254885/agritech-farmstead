import { useEffect, useState, type FormEvent } from 'react';
import type { Product, Category } from '@/types';
import {
  getAllProductsAdmin,
  getCategories,
  saveProduct,
  deleteProduct,
} from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import { isCloudinaryConfigured, uploadImage } from '@/lib/cloudinary';

const emptyForm = {
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  category: 'Livestock',
  categoryId: 'cat-livestock',
  price: 0,
  unit: '',
  images: '' as string,
  stockQuantity: 0,
  available: true,
  featured: false,
  tags: '',
  deliveryInformation: '',
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|$)/g, '');
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    setLoading(true);
    const [p, c] = await Promise.all([getAllProductsAdmin(), getCategories()]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function openNew() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    setMessage('');
    setError('');
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription,
      description: p.description,
      category: p.category,
      categoryId: p.categoryId,
      price: p.price,
      unit: p.unit,
      images: (p.images || []).join('\n'),
      stockQuantity: p.stockQuantity,
      available: p.available,
      featured: p.featured,
      tags: (p.tags || []).join(', '),
      deliveryInformation: p.deliveryInformation || '',
    });
    setShowForm(true);
    setMessage('');
    setError('');
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const cat = categories.find((c) => c.id === form.categoryId);
      await saveProduct({
        id: editingId || undefined,
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name),
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        category: cat?.name || form.category,
        categoryId: form.categoryId,
        price: Number(form.price),
        unit: form.unit.trim(),
        images: form.images
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        stockQuantity: Number(form.stockQuantity),
        available: form.available,
        featured: form.featured,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        deliveryInformation: form.deliveryInformation.trim(),
      });
      setMessage(editingId ? 'Product updated.' : 'Product created.');
      setShowForm(false);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteProduct(id);
    setMessage('Product deleted.');
    await refresh();
  }

  async function onFileUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const result = await uploadImage(file);
      setForm((f) => ({
        ...f,
        images: f.images
          ? `${f.images.trim()}\n${result.secure_url}`
          : result.secure_url,
      }));
      setMessage('Image uploaded to Cloudinary.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal-900">Products</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Livestock and butchery catalogue
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="bg-forest-900 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          Add product
        </button>
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

      {showForm && (
        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-4 border border-charcoal-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-charcoal-900">
            {editingId ? 'Edit product' : 'New product'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-charcoal-700">Name</span>
              <input
                required
                className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name,
                    slug: f.slug || slugify(name),
                  }));
                }}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-charcoal-700">Slug</span>
              <input
                required
                className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-charcoal-700">Category</span>
              <select
                className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                value={form.categoryId}
                onChange={(e) => {
                  const c = categories.find((x) => x.id === e.target.value);
                  setForm((f) => ({
                    ...f,
                    categoryId: e.target.value,
                    category: c?.name || f.category,
                  }));
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-charcoal-700">Unit</span>
              <input
                className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                placeholder="e.g. Per piglet, Per kg, Tray of 30"
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-charcoal-700">Price (KES)</span>
              <input
                type="number"
                min={0}
                required
                className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-charcoal-700">Stock quantity</span>
              <input
                type="number"
                min={0}
                className="mt-1 w-full border border-charcoal-300 px-3 py-2"
                value={form.stockQuantity}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    stockQuantity: Number(e.target.value),
                  }))
                }
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="font-medium text-charcoal-700">Short description</span>
            <input
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-charcoal-700">Full description</span>
            <textarea
              rows={4}
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-charcoal-700">
              Image URLs (one per line)
            </span>
            <textarea
              rows={3}
              className="mt-1 w-full border border-charcoal-300 px-3 py-2 font-mono text-xs"
              value={form.images}
              onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
              placeholder="https://…"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm">
              <span className="sr-only">Upload image</span>
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => onFileUpload(e.target.files?.[0] || null)}
              />
            </label>
            {!isCloudinaryConfigured() && (
              <span className="text-xs text-charcoal-500">
                Cloudinary not configured — paste image URLs, or set
                VITE_CLOUDINARY_* in .env
              </span>
            )}
            {uploading && (
              <span className="text-xs text-charcoal-500">Uploading…</span>
            )}
          </div>
          <label className="block text-sm">
            <span className="font-medium text-charcoal-700">Tags (comma-separated)</span>
            <input
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-charcoal-700">Delivery notes</span>
            <input
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.deliveryInformation}
              onChange={(e) =>
                setForm((f) => ({ ...f, deliveryInformation: e.target.value }))
              }
            />
          </label>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm((f) => ({ ...f, available: e.target.checked }))
                }
              />
              Published / in stock
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featured: e.target.checked }))
                }
              />
              Featured on homepage
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-forest-900 px-5 py-2 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save product'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-charcoal-300 px-5 py-2 text-sm font-semibold text-charcoal-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 overflow-x-auto border border-charcoal-200 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-charcoal-500">Loading…</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-sm text-charcoal-500">No products yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-charcoal-200 bg-charcoal-50 text-xs uppercase tracking-wide text-charcoal-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-charcoal-100">
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal-900">{p.name}</p>
                    <p className="text-xs text-charcoal-500">{p.unit}</p>
                  </td>
                  <td className="px-4 py-3 text-charcoal-700">{p.category}</td>
                  <td className="px-4 py-3">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3">{p.stockQuantity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        p.available ? 'text-forest-700' : 'text-charcoal-400'
                      }
                    >
                      {p.available ? 'Published' : 'Hidden'}
                    </span>
                    {p.featured && (
                      <span className="ml-2 text-xs text-[#1565c0]">Featured</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="mr-3 text-[#1565c0] hover:underline"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-700 hover:underline"
                      onClick={() => onDelete(p.id, p.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
