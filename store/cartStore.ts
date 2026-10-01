import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/lib/constants";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const clamp = (quantity: number) =>
  Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, quantity));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: clamp(i.quantity + quantity) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: clamp(quantity) }] };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: clamp(quantity) } : i
          ),
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);