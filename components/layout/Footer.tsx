import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Shop</p>
        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/cart" className="hover:text-blue-600">
            Cart
          </Link>
          <Link href="/login" className="hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
