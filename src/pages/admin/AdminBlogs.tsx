import { useEffect, useState, type FormEvent } from 'react';
import type { BlogPost } from '@/types';
import { getAllPostsAdmin, savePost, deletePost } from '@/lib/blogs';
import { isCloudinaryConfigured, uploadImage, resolveImageUrl } from '@/lib/cloudinary';

const empty = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  author: 'Agritech Farmstead',
  category: 'Farming',
  published: true,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|$)/g, '');
}

export function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    setLoading(true);
    setPosts(await getAllPostsAdmin());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function openNew() {
    setEditingId(null);
    setForm({ ...empty });
    setShowForm(true);
    setMessage('');
    setError('');
  }

  function openEdit(p: BlogPost) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      featuredImage: p.featuredImage || '',
      author: p.author || 'Agritech Farmstead',
      category: p.category || 'Farming',
      published: p.published,
    });
    setShowForm(true);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await savePost({
        id: editingId || undefined,
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        featuredImage: form.featuredImage.trim(),
        author: form.author.trim(),
        category: form.category.trim(),
        published: form.published,
        publishedAt: new Date().toISOString(),
      });
      setMessage(editingId ? 'Post updated.' : 'Post created.');
      setShowForm(false);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await deletePost(id);
    setMessage('Post deleted.');
    await refresh();
  }

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const r = await uploadImage(file);
      setForm((f) => ({ ...f, featuredImage: r.secure_url }));
      setMessage('Image uploaded.');
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
          <h1 className="text-2xl font-semibold text-charcoal-900">Blog</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Farm news shown on the public Blog page
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="bg-forest-900 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          New post
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
        <form onSubmit={onSubmit} className="mt-6 space-y-4 border border-charcoal-200 bg-white p-6">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit post' : 'New post'}</h2>
          <label className="block text-sm">
            <span className="font-medium">Title</span>
            <input
              required
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  title: e.target.value,
                  slug: f.slug || slugify(e.target.value),
                }))
              }
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Slug</span>
            <input
              required
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Excerpt</span>
            <textarea
              rows={2}
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Full content</span>
            <textarea
              rows={8}
              className="mt-1 w-full border border-charcoal-300 px-3 py-2"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Featured image URL</span>
            <input
              className="mt-1 w-full border border-charcoal-300 px-3 py-2 font-mono text-xs"
              value={form.featuredImage}
              onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))}
            />
          </label>
          {form.featuredImage && (
            <img
              src={resolveImageUrl(form.featuredImage)}
              alt=""
              className="h-32 w-auto object-cover border border-charcoal-200"
            />
          )}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => onUpload(e.target.files?.[0] || null)}
            />
            {!isCloudinaryConfigured() && (
              <span className="text-xs text-charcoal-500">Set Cloudinary env on Vercel</span>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published on public site
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-forest-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save post'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-charcoal-300 px-5 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 overflow-x-auto border border-charcoal-200 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-charcoal-500">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="p-6 text-sm text-charcoal-500">No posts yet.</p>
        ) : (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b bg-charcoal-50 text-xs uppercase text-charcoal-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-charcoal-100">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">
                    {p.published ? (
                      <span className="text-forest-700">Published</span>
                    ) : (
                      <span className="text-charcoal-400">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" className="mr-3 text-[#1565c0] hover:underline" onClick={() => openEdit(p)}>
                      Edit
                    </button>
                    <button type="button" className="text-red-700 hover:underline" onClick={() => onDelete(p.id, p.title)}>
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
