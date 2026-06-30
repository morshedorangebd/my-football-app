import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamBadgeProps {
  id: number;
  name: string;
  logo: string;
  size?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

export const TeamBadge: FC<TeamBadgeProps> = ({ id, name, logo, size = 'md', responsive = false }) => {
  const sizeClasses = responsive
    ? {
        sm: 'w-8 h-8 sm:w-6 sm:h-6',
        md: 'w-10 h-10 sm:w-8 sm:h-8',
        lg: 'w-12 h-12 sm:w-12 sm:h-12',
      }
    : {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
      };

  const textClasses = responsive
    ? {
        sm: 'text-xs sm:text-xs',
        md: 'text-sm sm:text-sm',
        lg: 'text-base sm:text-base',
      }
    : {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      };

  const imageSizes = responsive
    ? {
        sm: { width: 24, height: 24 },
        md: { width: 32, height: 32 },
        lg: { width: 32, height: 32 },
      }
    : {
        sm: { width: 24, height: 24 },
        md: { width: 24, height: 24 },
        lg: { width: 32, height: 32 },
      };

  return (
    <Link href={`/teams/${id}`} className="flex items-center gap-2 hover:opacity-75 transition-opacity min-w-[44px]">
      <Image src={logo} alt={name} {...imageSizes[size]} className={`${sizeClasses[size]} object-contain`} />
      <span className={`font-medium ${textClasses[size]} truncate`}>{name}</span>
    </Link>
  );
};