"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/utils/format";
import type { CartItem } from "@/types/cart";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const { product, quantity } = item;

  return (
    <li className="flex gap-4 py-4">
      <div className="relative h-24 w-24 shrink-0">
        <Image src={product.image} alt={product.title} fill sizes="96px" className="object-contain" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 text-sm font-medium text-gray-900 hover:underline"
        >
          {product.title}
        </Link>
        <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
        <div className="flex flex-wrap items-center gap-4">
          <QuantitySelector value={quantity} onChange={(q) => onQuantityChange(product.id, q)} />
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-900">
        {formatPrice(product.price * quantity)}
      </p>
    </li>
  );
}
