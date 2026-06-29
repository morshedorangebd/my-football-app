export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6 border border-zinc-200 dark:border-zinc-800">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full mb-4 animate-pulse"></div>
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-700 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="w-24 h-12 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-700 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-4 animate-pulse"></div>
        <div className="aspect-video bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}