"use client";

import { Input } from "@/components/ui/Input";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface PriceRangeFilterProps extends PriceRange {
  onChange: (range: PriceRange) => void;
}

const toNumber = (value: string) => (value === "" ? null : Number(value));

export function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        value={min ?? ""}
        onChange={(e) => onChange({ min: toNumber(e.target.value), max })}
        placeholder="Min $"
        aria-label="Minimum price"
      />
      <span className="text-gray-400">-</span>
      <Input
        type="number"
        min={0}
        value={max ?? ""}
        onChange={(e) => onChange({ min, max: toNumber(e.target.value) })}
        placeholder="Max $"
        aria-label="Maximum price"
      />
    </div>
  );
}