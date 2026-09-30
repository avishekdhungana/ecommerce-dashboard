import { getProducts } from "@/lib/api/product";

import {ProductGrid} from "@/components/product/ProductGrid";

export default async function Home() {
  const products = await getProducts("desc");

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7x2">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Products</h1>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
   