import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";

export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 h-8 w-32 animate-pulse rounded bg-gray-200" />
        <ProductGridSkeleton />
      </div>
    </main>
  );
}
