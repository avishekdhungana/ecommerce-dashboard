"use client";

import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { useHydrated } from "@/hooks/useHydrated";
import { getCartCount, getCartTotal } from "@/lib/utils/cart";
import { useCartStore } from "@/store/cartStore";

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!hydrated) return <p className="py-16 text-center text-gray-500">Loading cart...</p>;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add some products to get started."
        actionLabel="Continue shopping"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white px-4">
        {items.map((item) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>
      <CartSummary total={getCartTotal(items)} itemCount={getCartCount(items)} onClear={clearCart} />
    </div>
  );
}
