"use client";

import { Button } from "@/components/ui/Button";

export default function ProductError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-600">Product unavailable</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">We could not load this product</h1>
        <p className="mt-2 text-sm text-gray-600">Please try again or browse the catalog.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="primary" onClick={() => reset()}>
            Retry
          </Button>
          <a href="/products">
            <Button variant="secondary">Browse products</Button>
          </a>
        </div>
      </div>
    </main>
  );
}
