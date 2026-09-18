import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { SITE, whatsappUrl } from '@/lib/site';
import type { FulfillmentMethod } from '@/types';
import { MessageCircle } from 'lucide-react';

export function Checkout() {
  const { items, subtotal } = useCartStore();
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>('delivery');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    town: '',
    instructions: '',
  });
  const [error, setError] = useState('');

  const cartTotal = subtotal();
  const deliveryFee = fulfillment === 'pickup' ? 0 : 200;
  const total = cartTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Go to Shop</Link>
      </div>
    );
  }

  function buildWhatsAppMessage(): string {
    const lines = [
      `*New order — ${SITE.name}*`,
      '',
      `Name: ${form.fullName.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Method: ${fulfillment === 'pickup' ? 'Farm Pickup' : 'Delivery'}`,
    ];
    if (fulfillment === 'delivery') {
      lines.push(`Address: ${form.address.trim()}, ${form.town.trim()}`);
    }
    if (form.instructions.trim()) {
      lines.push(`Notes: ${form.instructions.trim()}`);
    }
    lines.push('', '*Items:*');
    items.forEach((i) => {
      lines.push(
        `• ${i.name} × ${i.quantity} (${i.unit}) — ${formatCurrency(i.price * i.quantity)}`
      );
    });
    lines.push(
      '',
      `Subtotal: ${formatCurrency(cartTotal)}`,
      `Delivery: ${deliveryFee === 0 ? 'Free (pickup)' : formatCurrency(deliveryFee)}`,
      `*Total: ${formatCurrency(total)}*`
    );
    return lines.join('\n');
  }

  function handleWhatsAppOrder(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.fullName.trim() || !form.phone.trim()) {
      setError('Please provide your full name and phone number.');
      return;
    }
    if (fulfillment === 'delivery' && (!form.address.trim() || !form.town.trim())) {
      setError('Please provide delivery address and town.');
      return;
    }
    window.open(whatsappUrl(buildWhatsAppMessage()), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-page py-10 md:py-14">
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-charcoal-600">
          Complete your details and send the order on WhatsApp. We will confirm availability and arrange payment with you.
        </p>

        <form onSubmit={handleWhatsAppOrder} className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-lg border border-forest-100 bg-white p-6">
              <h2 className="text-lg font-semibold">Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium">Full name *</label>
                  <input
                    id="fullName"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium">Phone number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="07XX XXX XXX"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-forest-100 bg-white p-6">
              <h2 className="text-lg font-semibold">Delivery or pickup</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-forest-200 px-4 py-3 has-[:checked]:border-forest-600 has-[:checked]:bg-forest-50">
                  <input type="radio" name="fulfillment" checked={fulfillment === 'delivery'} onChange={() => setFulfillment('delivery')} />
                  <span className="text-sm font-medium">Delivery</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-forest-200 px-4 py-3 has-[:checked]:border-forest-600 has-[:checked]:bg-forest-50">
                  <input type="radio" name="fulfillment" checked={fulfillment === 'pickup'} onChange={() => setFulfillment('pickup')} />
                  <span className="text-sm font-medium">Farm Pickup</span>
                </label>
              </div>

              {fulfillment === 'delivery' && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium">Delivery address *</label>
                    <input
                      id="address"
                      required={fulfillment === 'delivery'}
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="town" className="block text-sm font-medium">Town / Area *</label>
                    <input
                      id="town"
                      required={fulfillment === 'delivery'}
                      value={form.town}
                      onChange={(e) => setForm((f) => ({ ...f, town: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="instructions" className="block text-sm font-medium">Delivery instructions (optional)</label>
                    <textarea
                      id="instructions"
                      rows={2}
                      value={form.instructions}
                      onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-forest-200 px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="h-fit rounded-lg border border-forest-100 bg-white p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.productId} className="flex justify-between gap-2">
                  <span className="text-charcoal-600">{i.name} × {i.quantity}</span>
                  <span>{formatCurrency(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t border-forest-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>
            )}

            <button type="submit" className="btn-primary mt-6 w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              Order via WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-charcoal-500">
              Opens WhatsApp to {SITE.phoneDisplay}. Payment arranged after we confirm your order.
            </p>
            <Link to="/cart" className="mt-3 block text-center text-sm text-forest-700 hover:text-forest-900">
              Back to cart
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
