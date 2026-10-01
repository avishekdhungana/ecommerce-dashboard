"use client";

import { Button } from "@/components/ui/Button";

interface ProductsErrorProps {
  reset: () => void;
}

export default function ProductsError({ reset }: ProductsErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-600">Products unavailable</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">We could not load the catalog</h1>
        <p className="mt-2 text-sm text-gray-600">
          The product service is temporarily unavailable. Please try again in a moment.
        </p>
        <div className="mt-6 flex justify-center">
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
