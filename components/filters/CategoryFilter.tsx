"use client";

import { Select } from "@/components/ui/Select";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  const uniqueCategories = Array.from(new Set(categories)).sort((left, right) =>
    left.localeCompare(right)
  );

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
      className="capitalize"
    >
      <option value="">All</option>
      {uniqueCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
}