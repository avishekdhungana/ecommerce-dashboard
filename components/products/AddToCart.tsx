"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Toast } from "@/components/ui/Toast";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!isAuthenticated) {
      const redirect = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      return;
    }

    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <Button type="button" onClick={handleAdd}>
          {added ? "Added ✓" : "Add to cart"}
        </Button>
      </div>
      <Toast message="Added to cart" visible={added} />
    </>
  );
}