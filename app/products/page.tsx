import { getProducts } from "@/lib/api/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Pagination } from "@/components/ui/pagination";
import { SortSelect } from "@/components/ui/SortSelect";
import { PRODUCTS_PER_PAGE } from "@/lib/api/constants";
import { paginate } from "@/lib/api/pagination";
import type { SortOrder } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string; page?: string }>;
}

function parseSort(value?: string): SortOrder | undefined {
  return value === "asc" || value === "desc" ? value : undefined;
}

function parsePage(value?: string): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { sort, page } = await searchParams;
  const parsedSort = parseSort(sort);

  const products = await getProducts(parsedSort);
  const { items, currentPage, totalPages } = paginate(
    products,
    parsePage(page),
    PRODUCTS_PER_PAGE
  );

  function createHref(targetPage: number): string {
    const params = new URLSearchParams();
    if (parsedSort) params.set("sort", parsedSort);
    params.set("page", String(targetPage));
    return `/products?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <SortSelect />
        </div>
        <ProductGrid products={items} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          createHref={createHref}
        />
      </div>
    </main>
  );
}