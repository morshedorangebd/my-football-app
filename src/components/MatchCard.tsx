'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

interface MatchCardProps {
  id: number;
  homeTeam: { id: number; name: string; logo: string };
  awayTeam: { id: number; name: string; logo: string };
  league: { id: number; name: string; logo: string | null };
  date: string;
  state: { description: string; score?: { current?: string | null } };
}

export const MatchCard: FC<MatchCardProps> = ({ id, homeTeam, awayTeam, league, date, state }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const matchDate = new Date(date);
    setFormattedDate(
      matchDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, [date]);

  const homeLogo = homeTeam.logo && homeTeam.logo.trim() !== '' ? homeTeam.logo : null;
  const awayLogo = awayTeam.logo && awayTeam.logo.trim() !== '' ? awayTeam.logo : null;

  return (
    <Link href={`/matches/${id}`} className="block bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-md transition-shadow border border-zinc-200 dark:border-zinc-800">
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[60%]">{league.name}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400" suppressHydrationWarning>
            {formattedDate}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1 sm:gap-2 hover:opacity-75 transition-opacity min-w-0 max-w-[120px] sm:max-w-[140px] cursor-pointer">
            {homeLogo && <img src={homeLogo} alt={homeTeam.name} width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />}
            {!homeLogo && <div className="w-5 h-5 sm:w-6 sm:h-6 bg-zinc-300 dark:bg-zinc-600 rounded" />}
            <span className="text-xs sm:text-sm font-medium truncate">{homeTeam.name}</span>
          </span>
          <div className="text-center">
            {state.description === 'Not started' ? (
              <span className="text-xs sm:text-lg font-bold text-zinc-400">vs</span>
            ) : (
              <span className="text-sm sm:text-lg font-bold">
                {state.score?.current?.split('-')[0] || '-'} - {state.score?.current?.split('-')[1] || '-'}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 sm:gap-2 hover:opacity-75 transition-opacity min-w-0 max-w-[120px] sm:max-w-[140px] cursor-pointer">
            <span className="text-xs sm:text-sm font-medium truncate">{awayTeam.name}</span>
            {awayLogo && <img src={awayLogo} alt={awayTeam.name} width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />}
            {!awayLogo && <div className="w-5 h-5 sm:w-6 sm:h-6 bg-zinc-300 dark:bg-zinc-600 rounded" />}
          </span>
        </div>
        <div className="mt-1 sm:mt-2 text-center">
          <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {state.description}
          </span>
        </div>
      </div>
    </Link>
  );
};