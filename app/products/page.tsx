import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api/product";
import { ProductsView } from "@/components/products/productsView";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { SortSelect } from "@/components/ui/SortSelect";
import type { SortOrder } from "@/types/product";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products, filter by category and price, and sort the catalog.",
};

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string }>;
}

function parseSort(value?: string): SortOrder | undefined {
  return value === "asc" || value === "desc" ? value : undefined;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { sort } = await searchParams;

  const products = await getProducts(parseSort(sort));
  let categories: string[];

  try {
    categories = await getCategories();
  } catch {
    categories = Array.from(new Set(products.map((product) => product.category)));
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
          <SortSelect />
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsView products={products} categories={categories} />
        </Suspense>
      </div>
    </main>
  );
}