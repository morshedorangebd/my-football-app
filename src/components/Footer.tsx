import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
          <p>Football Hub &copy; {new Date().getFullYear()} - Data from local API</p>
        </div>
      </div>
    </footer>
  );
};