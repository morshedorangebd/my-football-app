import { FC } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ title, description = "Data unavailable on the current plan.", className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="text-zinc-400 dark:text-zinc-600 mb-2">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-3-3m-3 3l-3-3m-3 3l-3-3M4 21h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
    </div>
  );
};