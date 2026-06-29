export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        <div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32 animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-800">
              <div className="animate-pulse">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded mb-3"></div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                    <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  </div>
                  <div className="w-12 h-6 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                    <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  </div>
                </div>
                <div className="mt-3 h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mx-auto"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}