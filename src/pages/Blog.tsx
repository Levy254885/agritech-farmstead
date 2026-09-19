import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts } from '@/lib/blogs';
import type { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { resolveImageUrl } from '@/lib/cloudinary';

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      <section className="border-b border-charcoal-200">
        <div className="container-page py-14 md:py-20">
          <h1 className="font-display text-4xl text-charcoal-900 sm:text-5xl">
            Farm updates
          </h1>
          <p className="mt-4 max-w-2xl text-base text-charcoal-600">
            News and practical notes from Agritech Farmstead.
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        {loading ? (
          <p className="text-charcoal-500">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="text-charcoal-500">No posts published yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border border-charcoal-200 bg-white"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-charcoal-50">
                    {post.featuredImage ? (
                      <img
                        src={resolveImageUrl(post.featuredImage)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-xs text-charcoal-500">
                    {post.publishedAt ? formatDate(post.publishedAt) : ''}
                    {post.category ? ` · ${post.category}` : ''}
                  </p>
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="mt-2 text-lg font-semibold text-charcoal-900 hover:underline">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-sm text-charcoal-600">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
