import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/orders';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

const statuses: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Ready for Pickup',
  'Out for Delivery',
  'Completed',
  'Cancelled',
];

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  async function changeStatus(id: string, status: OrderStatus) {
    await updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, orderStatus: status, updatedAt: new Date().toISOString() }
          : o
      )
    );
  }

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="mt-1 text-sm text-charcoal-500">View and update order status</p>

      <div className="mt-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-charcoal-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="mt-8 text-charcoal-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-charcoal-500">No orders found.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((o) => (
            <div key={o.id} className="rounded-lg border border-charcoal-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{o.orderNumber}</p>
                  <p className="text-sm text-charcoal-600">
                    {o.customer.fullName} · {o.customer.phone}
                  </p>
                  <p className="text-xs text-charcoal-400">
                    {formatDate(o.createdAt)} · {o.fulfillmentMethod}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(o.total)}</p>
                  <select
                    value={o.orderStatus}
                    onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                    className="mt-1 rounded border border-charcoal-200 px-2 py-1 text-xs"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ul className="mt-3 border-t border-charcoal-100 pt-3 text-sm text-charcoal-600">
                {o.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — {formatCurrency(item.price * item.quantity)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
