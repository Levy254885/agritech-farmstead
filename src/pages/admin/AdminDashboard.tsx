import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '@/lib/orders';
import { getProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import type { Order, Product } from '@/types';

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
    getProducts({ availableOnly: false }).then(setProducts);
  }, []);

  const pending = orders.filter((o) => o.orderStatus === 'Pending').length;
  const completed = orders.filter((o) => o.orderStatus === 'Completed').length;
  const sales = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter(
    (p) => p.available && p.stockQuantity > 0 && p.stockQuantity < 10
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-charcoal-950">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal-500">Overview of sales and inventory</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total sales', value: formatCurrency(sales) },
          { label: 'Orders', value: String(orders.length) },
          { label: 'Pending', value: String(pending) },
          { label: 'Completed', value: String(completed) },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-charcoal-200 bg-white p-4">
            <p className="text-sm text-charcoal-500">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold text-charcoal-950">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-charcoal-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent orders</h2>
            <Link to="/admin/orders" className="text-sm text-forest-700 hover:underline">
              View all
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-charcoal-500">No orders yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-charcoal-100">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex justify-between py-2 text-sm">
                  <span>{o.orderNumber} · {o.customer.fullName}</span>
                  <span className="text-charcoal-600">
                    {formatCurrency(o.total)} · {o.orderStatus}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-charcoal-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Low stock</h2>
            <Link to="/admin/products" className="text-sm text-forest-700 hover:underline">
              Products
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="mt-4 text-sm text-charcoal-500">No low-stock items.</p>
          ) : (
            <ul className="mt-4 divide-y divide-charcoal-100">
              {lowStock.map((p) => (
                <li key={p.id} className="flex justify-between py-2 text-sm">
                  <span>{p.name}</span>
                  <span className="text-amber-700">{p.stockQuantity} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
