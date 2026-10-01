"use client";

import { useMemo } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SearchFilter } from "@/components/filters/SearchFilter";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { PriceRangeFilter } from "@/components/filters/PriceRangeFilter";
import { Pagination } from "@/components/ui/pagination";
import { useProductFilters } from "@/hooks/useProductFilters";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { filterProducts } from "@/lib/utils/filterProducts";
import { paginate } from "@/lib/utils/pagination";
import type { Product } from "@/types/product";

interface ProductsViewProps {
  products: Product[];
  categories: string[];
}

export function ProductsView({ products, categories }: ProductsViewProps) {
  const { filters, page, setSearch, setCategory, setPriceRange, setPage } =
    useProductFilters();

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );
  const { items, currentPage, totalPages } = paginate(filtered, page, PRODUCTS_PER_PAGE);

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SearchFilter value={filters.search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          value={filters.category}
          onChange={setCategory}
        />
        <PriceRangeFilter
          min={filters.minPrice}
          max={filters.maxPrice}
          onChange={({ min, max }) => setPriceRange(min, max)}
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