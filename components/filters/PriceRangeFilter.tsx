"use client";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface PriceRangeFilterProps extends PriceRange {
  onChange: (range: PriceRange) => void;
}

const toNumber = (value: string) => (value === "" ? null : Number(value));

export function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm";

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        value={min ?? ""}
        onChange={(e) => onChange({ min: toNumber(e.target.value), max })}
        placeholder="Min $"
        aria-label="Minimum price"
        className={inputClass}
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        min={0}
        value={max ?? ""}
        onChange={(e) => onChange({ min, max: toNumber(e.target.value) })}
        placeholder="Max $"
        aria-label="Maximum price"
        className={inputClass}
      />
    </div>
  );
}