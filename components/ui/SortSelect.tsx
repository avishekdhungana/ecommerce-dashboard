"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (event.target.value === "all") params.delete("sort");
    else params.set("sort", event.target.value);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <Select
      value={searchParams.get("sort") ?? "all"}
      onChange={handleChange}
      aria-label="Sort products"
      className="min-w-[150px]"
    >
      <option value="all">All products</option>
      <option value="asc">Oldest first</option>
      <option value="desc">Newest first</option>
    </Select>
  );
}