import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/site';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const waMessage = `Hello Agritech Farmstead, I would like to order:\n• ${product.name} (${product.unit || 'unit'})\nPrice: ${formatCurrency(product.price)}\n\nPlease confirm availability.`;

  const isAvailable = product.available !== false && product.stockQuantity > 0;

  return (
    <article className="group flex flex-col">
      <Link to={`/shop/${product.slug}`} className="block overflow-hidden rounded-xl bg-forest-50">
        <div className="aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-forest-300">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        {product.category && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-forest-600">
            {product.category}
          </p>
        )}
        <Link to={`/shop/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-charcoal-950 transition-colors group-hover:text-forest-800">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-charcoal-500">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-base font-semibold text-charcoal-950">
              {formatCurrency(product.price)}
              {product.unit && (
                <span className="ml-1 text-sm font-normal text-charcoal-500">
                  / {product.unit}
                </span>
              )}
            </p>
            {isAvailable ? (
              <span className="text-xs font-medium text-forest-600">Available</span>
            ) : (
              <span className="text-xs font-medium text-charcoal-400">Out of stock</span>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              to={`/shop/${product.slug}`}
              className="flex-1 rounded-full border border-forest-200 bg-white py-2.5 text-center text-xs font-semibold text-forest-900 transition-colors hover:border-forest-400 hover:bg-forest-50"
            >
              View details
            </Link>
            <a
              href={whatsappUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest-800 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-forest-900"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Order
            </a>
          </div>

          {isAvailable && (
            <button
              type="button"
              onClick={() => addItem(product)}
              className="w-full text-center text-xs font-medium text-charcoal-500 transition-colors hover:text-forest-800"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
