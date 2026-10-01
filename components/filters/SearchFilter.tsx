"use client";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      aria-label="Search products"
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
    />
  );
}