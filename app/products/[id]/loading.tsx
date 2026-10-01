export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="mt-6 grid gap-8 rounded-lg border border-gray-200 bg-white p-6 md:grid-cols-2">
          <div className="h-80 rounded bg-gray-200 md:h-96" />
          <div className="space-y-4">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-8 w-full rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-24 w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}