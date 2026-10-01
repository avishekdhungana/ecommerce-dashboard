import { request } from "@/lib/api/client";
import type { Product, SortOrder } from "@/types/product";

export function getProducts(sort?: SortOrder): Promise<Product[]> {
  const endpoint = sort ? `/products?sort=${encodeURIComponent(sort)}` : "/products";
  return request<Product[]>(endpoint);
}

export function getProduct(id: number | string): Promise<Product> {
  return request<Product>(`/products/${encodeURIComponent(String(id))}`);
}

export function getCategories(): Promise<string[]> {
  return request<string[]>("/products/categories");
}