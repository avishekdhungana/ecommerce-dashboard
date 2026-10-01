"use client";

import { useState } from "react";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <button
        type="button"
        onClick={handleAdd}
        className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}