"use client";

import Link from "next/link";
import { useHydrated } from "@/hooks/useHydrated";
import { getCartCount } from "@/lib/utils/cart";
import { useCartStore } from "@/store/cartStore";

export function CartBadge() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const count = hydrated ? getCartCount(items) : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} items`}
      className="relative text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      Cart
      {count > 0 && (
        <span className="absolute -right-5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}