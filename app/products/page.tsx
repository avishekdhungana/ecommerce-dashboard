import { getProducts, getCategories } from "@/lib/api/product";
import { ProductsView } from "@/components/product/ProductsView";
import { SortSelect } from "@/components/ui/SortSelect";
import type { SortOrder } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string }>;
}

function parseSort(value?: string): SortOrder | undefined {
  return value === "asc" || value === "desc" ? value : undefined;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { sort } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts(parseSort(sort)),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <SortSelect />
        </div>
        <ProductsView products={products} categories={categories} />
      </div>
    </main>
  );
}