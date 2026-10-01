import { request } from "@/lib/api/client";
import { fallbackProducts, sortFallbackProducts } from "@/lib/api/fallbackProducts";
import type { Product, SortOrder } from "@/types/product";

export async function getProducts(sort?: SortOrder): Promise<Product[]> {
  const endpoint = sort ? `/products?sort=${encodeURIComponent(sort)}` : "/products";

  try {
    return await request<Product[]>(endpoint);
  } catch {
    return sortFallbackProducts(sort);
  }
}

export async function getProduct(id: number | string): Promise<Product> {
  try {
    return await request<Product>(`/products/${encodeURIComponent(String(id))}`);
  } catch (error) {
    const fallbackProduct = fallbackProducts.find(
      (product) => product.id === Number(id)
    );

    if (fallbackProduct) return fallbackProduct;
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    return await request<string[]>("/products/categories");
  } catch {
    return Array.from(new Set(fallbackProducts.map((product) => product.category)));
  }
}