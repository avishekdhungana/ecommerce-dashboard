import { Suspense } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { CartView } from "@/components/cart/CartView";

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-500">Loading cart...</div>}>
      <RequireAuth>
        <main className="min-h-screen bg-gray-50 px-6 py-10">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Your cart</h1>
            <CartView />
          </div>
        </main>
      </RequireAuth>
    </Suspense>
  );
}
