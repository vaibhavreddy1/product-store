import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { formatPrice, timeAgo } from "../utils/format";
import useCartStore from "../store/useCartStore";
import Modal from "../components/Modal";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const [itemToRemove, setItemToRemove] = useState(null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <ShoppingCart
          size={48}
          className="mx-auto text-slate-400"
        />

        <h1 className="mt-5 font-display text-3xl font-bold text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-3 text-slate-600">
          Add some products to your cart to get started.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Shopping Cart
          </p>

          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900">
            Your Cart
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5"
              >
                {/* Product Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-28 w-28 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  {/* Product Information */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-bold text-slate-900">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {formatPrice(item.price)} each
                      </p>

                      {/* Added Time */}
                      {item.addedAt && (
                        <p className="mt-1 text-xs text-slate-400">
                          Added {timeAgo(item.addedAt)}
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => setItemToRemove(item)}
                      className="text-slate-400 transition hover:text-red-600"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  {/* Quantity + Item Total */}
                  <div className="mt-5 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="p-2 text-slate-600 hover:text-teal-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="p-2 text-slate-600 hover:text-teal-700"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <p className="font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 flex items-center justify-between text-slate-600">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="my-5 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">
                Total
              </span>

              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
            >
              Checkout
            </button>
          </aside>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={Boolean(itemToRemove)}
        onClose={() => setItemToRemove(null)}
        title="Remove item?"
      >
        <p className="text-slate-600">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-slate-900">
            {itemToRemove?.title}
          </span>{" "}
          from your cart?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          {/* Cancel */}
          <button
            type="button"
            onClick={() => setItemToRemove(null)}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          {/* Confirm Remove */}
          <button
            type="button"
            onClick={() => {
              if (itemToRemove) {
                removeItem(itemToRemove.id);
                setItemToRemove(null);
              }
            }}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </Modal>
    </>
  );
}