export function ProductGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 animate-pulse">
          <div className="h-48 rounded-md bg-gray-200" />
          <div className="mt-4 h-4 w-20 rounded bg-gray-200" />
          <div className="mt-2 h-5 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-4 h-6 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
