import { Link, useLocation, useParams } from 'react-router-dom';
import type { Order } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { SITE, whatsappUrl } from '@/lib/site';
import { MessageCircle } from 'lucide-react';

export function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const order = (location.state as { order?: Order })?.order;

  if (!order) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Order confirmation</h1>
        <p className="mt-3 text-charcoal-600">
          {orderId ? (
            <>
              Reference: <strong>{orderId}</strong>.{' '}
            </>
          ) : null}
          For fastest service, send your order on WhatsApp to {SITE.phoneDisplay}.
        </p>
        <a
          href={whatsappUrl('Hello, I would like to place an order.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 inline-flex gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp {SITE.phoneDisplay}
        </a>
        <div className="mt-4">
          <Link to="/shop" className="btn-secondary inline-flex">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-lg rounded-lg border border-forest-100 bg-white p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-100 text-forest-700">
            ✓
          </div>
          <h1 className="mt-4 text-2xl font-semibold">Thank you for your order</h1>
          <p className="mt-2 text-charcoal-600">
            Order <strong>{order.orderNumber}</strong> has been received.
          </p>
          <p className="mt-1 text-sm text-charcoal-500">
            Placed on {formatDate(order.createdAt)}
          </p>
          <div className="mt-8 border-t border-forest-100 pt-6 text-left text-sm">
            <p>
              <span className="text-charcoal-500">Name:</span> {order.customer.fullName}
            </p>
            <p className="mt-1">
              <span className="text-charcoal-500">Phone:</span> {order.customer.phone}
            </p>
            <p className="mt-1">
              <span className="text-charcoal-500">Method:</span>{' '}
              {order.fulfillmentMethod === 'pickup' ? 'Farm pickup' : 'Delivery'}
            </p>
            <p className="mt-3 font-semibold">Total: {formatCurrency(order.total)}</p>
          </div>
          <p className="mt-6 text-sm text-charcoal-600">
            We will confirm on WhatsApp and arrange payment with you.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
