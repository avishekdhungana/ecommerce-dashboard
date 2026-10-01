import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  createHref: (page: number) => string;
}

export function Pagination({
  currentPage,
  totalPages,
  createHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const linkClass = "rounded-md border px-3 py-2 text-sm";

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={createHref(currentPage - 1)} className={`${linkClass} border-gray-300 bg-white`}>
          Previous
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`${linkClass} ${
            page === currentPage
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={createHref(currentPage + 1)} className={`${linkClass} border-gray-300 bg-white`}>
          Next
        </Link>
      )}
    </nav>
  );
}