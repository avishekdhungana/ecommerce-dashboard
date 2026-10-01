import { formatPrice } from "@/lib/utils/format";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onClear: () => void;
}

export function CartSummary({ total, itemCount, onClear }: CartSummaryProps) {
  return (
    <aside className="h-fit rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Items</dt>
          <dd>{itemCount}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
      >
        Clear cart
      </button>
    </aside>
  );
}
