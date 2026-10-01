"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", event.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={searchParams.get("sort") ?? "asc"}
      onChange={handleChange}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      aria-label="Sort products"
    >
      <option value="asc">Oldest first</option>
      <option value="desc">Newest first</option>
    </select>
  );
}