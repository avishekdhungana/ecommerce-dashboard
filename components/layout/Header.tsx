"use client";

import Link from "next/link";
import { useState } from "react";
import { CartBadge } from "@/components/cart/CartBadge";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/products" className="text-lg font-bold tracking-tight text-gray-900">
          Shop
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Cart
          </Link>
          {isAuthenticated ? (
            <Button variant="secondary" size="sm" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
          )}
          <CartBadge />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <CartBadge />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            <Link href="/products" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Products
            </Link>
            <Link href="/cart" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Cart
            </Link>
            {isAuthenticated ? (
              <button type="button" onClick={logout} className="rounded-md px-2 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            ) : (
              <Link href="/login" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}