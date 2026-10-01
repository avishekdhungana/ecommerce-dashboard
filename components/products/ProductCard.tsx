import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Rating } from "@/components/ui/Rating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      <p className="mt-4 text-xs uppercase tracking-wide text-gray-500">
        {product.category}
      </p>
      <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900">
        {product.title}
      </h3>
      <div className="mt-2">
        <Rating rate={product.rating.rate} count={product.rating.count} />
      </div>
      <p className="mt-auto pt-3 text-lg font-semibold text-gray-900">
        ${product.price.toFixed(2)}
      </p>
    </Link>
  );
}