import { FC } from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-32 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <div className="aspect-video bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}