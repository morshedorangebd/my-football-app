export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
        <div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32 animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {Array(6)
                  .fill(0)
                  .map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-20 animate-pulse"></div>
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-12 animate-pulse"></div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}