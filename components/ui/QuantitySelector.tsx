"use client";

import { MAX_QUANTITY, MIN_QUANTITY } from "@/lib/constants";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
}: QuantitySelectorProps) {
  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-lg disabled:opacity-50";

  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label="Quantity">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={buttonClass}
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={buttonClass}
      >
        +
      </button>
    </div>
  );
}