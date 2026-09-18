import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-forest-100 bg-white transition-shadow hover:shadow-md">
      <Link to={`/shop/${product.slug}`} className="block overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-forest-50">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-forest-300">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-medium text-charcoal-950 group-hover:text-forest-800">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 text-sm text-charcoal-600">
            {product.shortDescription}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="font-semibold text-forest-800">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs text-charcoal-500">{product.unit}</p>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <Link
              to={`/shop/${product.slug}`}
              className="text-xs font-medium text-forest-700 hover:text-forest-900"
            >
              View details
            </Link>
            {product.available && product.stockQuantity > 0 ? (
              <button
                type="button"
                onClick={() => addItem(product, 1)}
                className="btn-primary text-xs px-3 py-2"
              >
                Add to Cart
              </button>
            ) : (
              <span className="text-xs font-medium text-charcoal-500">
                Out of stock
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
