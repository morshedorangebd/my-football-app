export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
}