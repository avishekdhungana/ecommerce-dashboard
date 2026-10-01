import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
      <p className="mt-2 text-gray-600">We could not find that product.</p>
      <Link href="/products" className="mt-6 inline-block text-blue-600 hover:underline">
        Back to products
      </Link>
    </main>
  );
}