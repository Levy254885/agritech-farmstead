import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { whatsappUrl } from '@/lib/site';
import { resolveImageUrl } from '@/lib/cloudinary';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const waMessage = `Hello Agritech Farmstead, I would like to order:\n• ${product.name} (${product.unit || 'unit'})\nPrice: ${formatCurrency(product.price)}\n\nPlease confirm availability.`;

  const isAvailable = product.available !== false && product.stockQuantity > 0;

  return (
    <article className="flex flex-col border border-charcoal-200 bg-white">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-charcoal-50">
          {product.images?.[0] ? (
            <img
              src={resolveImageUrl(product.images[0])}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-charcoal-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col border-t border-charcoal-200 p-4">
        <Link to={`/shop/${product.slug}`}>
          <h3 className="text-sm font-semibold text-charcoal-900 hover:underline">
            {product.name}
          </h3>
        </Link>
        {product.unit && (
          <p className="mt-1 text-xs text-charcoal-500">{product.unit}</p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-charcoal-900">
              {formatCurrency(product.price)}
            </p>
            <span className="text-xs text-charcoal-500">
              {isAvailable ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/shop/${product.slug}`}
              className="flex-1 border border-charcoal-300 py-2 text-center text-xs font-semibold text-charcoal-800 hover:border-charcoal-500 hover:bg-charcoal-50"
            >
              Details
            </Link>
            <a
              href={whatsappUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-forest-900 bg-forest-900 py-2 text-center text-xs font-semibold text-white hover:bg-forest-800"
            >
              Order
            </a>
          </div>

          {isAvailable && (
            <button
              type="button"
              onClick={() => addItem(product)}
              className="w-full text-center text-xs font-medium text-charcoal-600 hover:text-charcoal-900"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
