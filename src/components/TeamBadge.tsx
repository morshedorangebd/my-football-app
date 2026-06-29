import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamBadgeProps {
  id: number;
  name: string;
  logo: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TeamBadge: FC<TeamBadgeProps> = ({ id, name, logo, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <Link href={`/teams/${id}`} className="flex items-center gap-2 hover:opacity-75 transition-opacity">
      <Image src={logo} alt={name} width={32} height={32} className={`${sizeClasses[size]} object-contain`} />
      <span className={`font-medium ${textClasses[size]} truncate`}>{name}</span>
    </Link>
  );
};