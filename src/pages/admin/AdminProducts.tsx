import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ availableOnly: false })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Manage catalogue. Full create/edit with image upload requires Firebase Storage.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-charcoal-500">Loading…</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-charcoal-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-charcoal-200 bg-charcoal-50">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-charcoal-600">{p.category}</td>
                  <td className="px-4 py-3">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3">{p.stockQuantity}</td>
                  <td className="px-4 py-3">
                    {p.available ? (
                      <span className="text-forest-700">Active</span>
                    ) : (
                      <span className="text-charcoal-400">Disabled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
