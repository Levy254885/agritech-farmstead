import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function Cart() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCartStore();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-charcoal-600">
          Browse the farm shop and add products to get started.
        </p>
        <Link to="/shop" className="btn-primary mt-8 inline-flex">
          Go to Farm Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-page py-10 md:py-14">
        <h1 className="text-3xl font-semibold tracking-tight">Shopping Cart</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 rounded-lg border border-forest-100 bg-white p-4"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-forest-50">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <Link
                      to={`/shop/${item.slug}`}
                      className="font-medium text-charcoal-950 hover:text-forest-800"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-charcoal-500">{item.unit}</p>
                    <p className="mt-1 font-medium text-forest-800">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-forest-200">
                      <button
                        type="button"
                        className="p-2"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="rounded-md p-2 text-charcoal-500 hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-charcoal-500 hover:text-charcoal-800"
            >
              Clear cart
            </button>
          </div>

          <div className="h-fit rounded-lg border border-forest-100 bg-white p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <p className="text-xs text-charcoal-500">
                Delivery fees calculated at checkout. Order via WhatsApp.
              </p>
            </div>
            <div className="mt-4 border-t border-forest-100 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-6 w-full">
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="mt-3 block text-center text-sm text-forest-700 hover:text-forest-900"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
