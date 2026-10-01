import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api/product";
import type { Product } from "@/types/product";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://example.com";
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch {
    // The sitemap remains valid when the product API blocks build-time requests.
  }

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
    })),
  ];
}
