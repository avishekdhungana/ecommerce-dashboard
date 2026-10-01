import type { CartItem } from "@/types/cart";

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, { quantity }) => sum + quantity, 0);
}