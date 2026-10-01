"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { ProductFilters } from "@/types/product";

function parseNumber(value: string | null): number | null {
  if (value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

type ParamChanges = Record<string, string | null>;

export function useProductFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filters: ProductFilters = useMemo(
    () => ({
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
      minPrice: parseNumber(searchParams.get("minPrice")),
      maxPrice: parseNumber(searchParams.get("maxPrice")),
    }),
    [searchParams]
  );

  const page = parsePage(searchParams.get("page"));

  const updateParams = useCallback(
    (changes: ParamChanges, { replace = false } = {}) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(changes).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      });

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      if (replace) window.history.replaceState(null, "", url);
      else window.history.pushState(null, "", url);
    },
    [searchParams, pathname]
  );

  const setSearch = (search: string) =>
    updateParams({ search, page: null }, { replace: true });

  const setCategory = (category: string) =>
    updateParams({ category, page: null });

  const setPriceRange = (min: number | null, max: number | null) =>
    updateParams(
      {
        minPrice: min === null ? null : String(min),
        maxPrice: max === null ? null : String(max),
        page: null,
      },
      { replace: true }
    );

  const setPage = (nextPage: number) =>
    updateParams({ page: nextPage === 1 ? null : String(nextPage) });

  return { filters, page, setSearch, setCategory, setPriceRange, setPage };
}
