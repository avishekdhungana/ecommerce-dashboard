import type { Product, ProductFilters } from "@/types/product";

export function filterProducts(
  products: Product[],
  { search, category, minPrice, maxPrice }: ProductFilters
): Product[] {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch = !query || product.title.toLowerCase().includes(query);
    const matchesCategory = !category || product.category === category;
    const matchesMin = minPrice === null || product.price >= minPrice;
    const matchesMax = maxPrice === null || product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });
}