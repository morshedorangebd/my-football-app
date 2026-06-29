import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MatchCardProps {
  id: number;
  homeTeam: { id: number; name: string; logo: string };
  awayTeam: { id: number; name: string; logo: string };
  league: { id: number; name: string; logo: string | null };
  date: string;
  state: { description: string; score?: { current?: string | null } };
}

export const MatchCard: FC<MatchCardProps> = ({ id, homeTeam, awayTeam, league, date, state }) => {
  const matchDate = new Date(date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const homeLogo = homeTeam.logo && homeTeam.logo.trim() !== '' ? homeTeam.logo : null;
  const awayLogo = awayTeam.logo && awayTeam.logo.trim() !== '' ? awayTeam.logo : null;

  return (
    <Link href={`/matches/${id}`} className="block bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-md transition-shadow border border-zinc-200 dark:border-zinc-800">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{league.name}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{formattedDate}</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-2 hover:opacity-75 transition-opacity min-w-0 max-w-[140px] cursor-pointer">
            {homeLogo && <Image src={homeLogo} alt={homeTeam.name} width={24} height={24} className="object-contain" />}
            {!homeLogo && <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded" />}
            <span className="text-sm font-medium truncate">{homeTeam.name}</span>
          </span>
          <div className="text-center">
            {state.description === 'Not started' ? (
              <span className="text-xs text-zinc-500">vs</span>
            ) : (
              <span className="text-lg font-bold">
                {state.score?.current?.split('-')[0] || '-'} - {state.score?.current?.split('-')[1] || '-'}
              </span>
            )}
          </div>
          <span className="flex items-center gap-2 hover:opacity-75 transition-opacity min-w-0 max-w-[140px] cursor-pointer">
            <span className="text-sm font-medium truncate">{awayTeam.name}</span>
            {awayLogo && <Image src={awayLogo} alt={awayTeam.name} width={24} height={24} className="object-contain" />}
            {!awayLogo && <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded" />}
          </span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {state.description}
          </span>
        </div>
      </div>
    </Link>
  );
};