import Link from "next/link";
import { CartBadge } from "@/components/cart/CartBadge";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/products" className="text-lg font-bold text-gray-900">
          Shop
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <CartBadge />
        </div>
      </nav>
    </header>
  );
}