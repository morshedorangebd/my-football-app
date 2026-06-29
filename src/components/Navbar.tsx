import Link from 'next/link';
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/matches', label: 'Matches' },
  { href: '/highlights', label: 'Highlights' },
  { href: '/teams', label: 'Teams' },
  { href: '/players', label: 'Players' },
];

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <header className={cn('bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800', className)}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-zinc-900 dark:text-white">Football Hub</span>
          </Link>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};