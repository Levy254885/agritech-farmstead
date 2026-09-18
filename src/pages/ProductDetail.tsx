import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductBySlug, getProducts } from '@/lib/products';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/shop/ProductCard';
import { SITE, whatsappUrl } from '@/lib/site';
import { Minus, Plus, MessageCircle } from 'lucide-react';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProductBySlug(slug)
      .then(async (p) => {
        setProduct(p);
        if (p) {
          const all = await getProducts({ category: p.categoryId });
          setRelated(all.filter((x) => x.id !== p.id).slice(0, 3));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-24 text-center text-charcoal-500">Loading…</div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to Shop</Link>
      </div>
    );
  }

  const inStock = product.available && product.stockQuantity > 0;

  function orderOnWhatsApp() {
    if (!product) return;
    const msg = [
      `Hi ${SITE.name}, I would like to order:`,
      `• ${product.name} × ${qty} (${product.unit}) — ${formatCurrency(product.price * qty)}`,
      '',
      'Please confirm availability. Thank you.',
    ].join('\n');
    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="bg-cream-50">
      <div className="container-page py-8 md:py-12">
        <nav className="mb-6 text-sm text-charcoal-500">
          <Link to="/shop" className="hover:text-forest-700">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal-800">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-forest-100 bg-white">
            <div className="aspect-square">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-forest-50 text-forest-300">No image</div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold text-forest-800">
              {formatCurrency(product.price)}
              <span className="ml-2 text-base font-normal text-charcoal-500">/ {product.unit}</span>
            </p>
            <p className="mt-2 text-sm">
              {inStock ? (
                <span className="text-forest-700">In stock</span>
              ) : (
                <span className="text-charcoal-500">Out of stock</span>
              )}
            </p>
            <p className="mt-6 leading-relaxed text-charcoal-700">{product.description}</p>

            {inStock && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-md border border-forest-200 bg-white">
                  <button type="button" className="p-2.5 text-charcoal-700 hover:bg-forest-50" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2.5rem] text-center text-sm font-medium">{qty}</span>
                  <button type="button" className="p-2.5 text-charcoal-700 hover:bg-forest-50" onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))} aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button type="button" className="btn-primary" onClick={() => addItem(product, qty)}>
                  Add to Cart
                </button>
                <button type="button" className="btn-secondary gap-2" onClick={orderOnWhatsApp}>
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </button>
              </div>
            )}

            {product.deliveryInformation && (
              <div className="mt-8 rounded-md border border-forest-100 bg-white p-4">
                <h3 className="text-sm font-semibold text-charcoal-900">Delivery information</h3>
                <p className="mt-1 text-sm text-charcoal-600">{product.deliveryInformation}</p>
              </div>
            )}

            {product.nutritionalInformation && (
              <div className="mt-4 rounded-md border border-forest-100 bg-white p-4">
                <h3 className="text-sm font-semibold text-charcoal-900">Nutritional information</h3>
                <p className="mt-1 text-sm text-charcoal-600">{product.nutritionalInformation}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold">Related products</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
