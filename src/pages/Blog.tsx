import { Link } from 'react-router-dom';
import { demoBlogPosts } from '@/data/demo';
import { formatDate } from '@/lib/utils';

export function Blog() {
  const posts = demoBlogPosts.filter((p) => p.published);

  return (
    <div className="bg-cream-50">
      <section className="border-b border-forest-100 bg-white">
        <div className="container-page py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Farm updates
          </h1>
          <p className="prose-farm mt-4 max-w-2xl text-lg">
            News, insights, and stories from Agritech Farmstead.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-center text-charcoal-600">
              No posts published yet.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-lg border border-forest-100 bg-white"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-forest-50">
                      <img
                        src={post.featuredImage}
                        alt=""
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-forest-600">
                      {post.category} · {formatDate(post.publishedAt)}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-forest-800"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-charcoal-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
