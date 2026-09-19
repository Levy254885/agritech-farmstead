import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPostBySlug } from '@/lib/blogs';
import type { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { resolveImageUrl } from '@/lib/cloudinary';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-24 text-center text-charcoal-500">
        Loading…
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-[#1565c0] underline">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <div className="container-page max-w-3xl py-14 md:py-20">
        <Link to="/blog" className="text-sm text-charcoal-500 hover:underline">
          ← Blog
        </Link>
        <p className="mt-6 text-xs text-charcoal-500">
          {post.publishedAt ? formatDate(post.publishedAt) : ''}
          {post.author ? ` · ${post.author}` : ''}
        </p>
        <h1 className="mt-3 font-display text-3xl text-charcoal-900 sm:text-4xl">
          {post.title}
        </h1>
        {post.featuredImage && (
          <div className="mt-8 aspect-[16/9] overflow-hidden bg-charcoal-50">
            <img
              src={resolveImageUrl(post.featuredImage)}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-charcoal-700">
          {post.content}
        </div>
      </div>
    </article>
  );
}
