import { Link, useParams } from 'react-router-dom';
import { demoBlogPosts } from '@/data/demo';
import { formatDate } from '@/lib/utils';

export function BlogPost() {
  const { slug } = useParams();
  const post = demoBlogPosts.find((p) => p.slug === slug && p.published);

  if (!post) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Link to="/blog" className="btn-primary mt-6 inline-flex">
          Back to updates
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-cream-50">
      <div className="border-b border-forest-100 bg-white">
        <div className="container-page py-10 md:py-14">
          <nav className="text-sm text-charcoal-500">
            <Link to="/blog" className="hover:text-forest-700">
              Farm updates
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal-800">{post.title}</span>
          </nav>
          <p className="mt-6 text-xs font-medium uppercase tracking-wider text-forest-600">
            {post.category} · {formatDate(post.publishedAt)}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-charcoal-500">By {post.author}</p>
        </div>
      </div>
      <div className="container-page py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={post.featuredImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="prose-farm mt-10 whitespace-pre-line text-base">
            {post.content}
          </div>
        </div>
      </div>
    </article>
  );
}
