"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", event.target.value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      value={searchParams.get("sort") ?? "asc"}
      onChange={handleChange}
      aria-label="Sort products"
      className="min-w-[150px]"
    >
      <option value="asc">Oldest first</option>
      <option value="desc">Newest first</option>
    </Select>
  );
}