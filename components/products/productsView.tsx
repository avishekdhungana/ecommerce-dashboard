"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SearchFilter } from "@/components/filters/SearchFilter";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { PriceRangeFilter } from "@/components/filters/PriceRangeFilter";
import { Pagination } from "@/components/ui/pagination";
import { PRODUCTS_PER_PAGE } from "@/lib/api/constants";
import { filterProducts } from "@/lib/api/filterProducts";
import { paginate } from "@/lib/api/pagination";
import type { Product, ProductFilters } from "@/types/product";

interface ProductsViewProps {
  products: Product[];
  categories: string[];
}

const DEFAULT_FILTERS: ProductFilters = {
  search: "",
  category: "",
  minPrice: null,
  maxPrice: null,
};

export function ProductsView({ products, categories }: ProductsViewProps) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );
  const { items, currentPage, totalPages } = paginate(filtered, page, PRODUCTS_PER_PAGE);

  function updateFilters(changes: Partial<ProductFilters>) {
    setFilters((prev) => ({ ...prev, ...changes }));
    setPage(1); // a new filter always starts from page 1
  }

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SearchFilter
          value={filters.search}
          onChange={(search) => updateFilters({ search })}
        />
        <CategoryFilter
          categories={categories}
          value={filters.category}
          onChange={(category) => updateFilters({ category })}
        />
        <PriceRangeFilter
          min={filters.minPrice}
          max={filters.maxPrice}
          onChange={({ min, max }) => updateFilters({ minPrice: min, maxPrice: max })}
        />
      </div>

      {items.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          No products match your filters.
        </p>
      ) : (
        <ProductGrid products={items} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}