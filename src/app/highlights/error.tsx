'use client';

import { EmptyState } from '@/components/EmptyState';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EmptyState title="Failed to load highlights" />
      <div className="flex justify-center mt-4">
        <button
          onClick={reset}
          className="px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}