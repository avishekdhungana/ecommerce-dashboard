import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/products/AddToCart";
import { Rating } from "@/components/ui/Rating";
import { ApiError } from "@/lib/api/error";
import { getProduct } from "@/lib/api/product";
import { formatPrice } from "@/lib/utils/format";
import type { Product } from "@/types/product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.image }],
      },
    };
  } catch {
    return {
      title: "Product not found",
    };
  }
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product: Product;
  try {
    product = await getProduct(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error; // anything else goes to error.tsx
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/products" className="text-sm text-blue-600 hover:underline">
            ← Back to products
          </Link>

          <div className="mt-6 grid gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
            <div className="relative h-80 w-full md:h-96">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                {product.category}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">{product.title}</h1>
              <div className="mt-3">
                <Rating rate={product.rating.rate} count={product.rating.count} />
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900">
                {formatPrice(product.price)}
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {product.description}
              </p>
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}