import { EmptyState } from '@/components/EmptyState';
import Link from 'next/link';
import Image from 'next/image';

interface MatchDetail {
  id: number;
  round: string;
  date: string;
  country: { code: string; name: string; logo: string };
  state: { description: string; score?: { current?: string | null } };
  awayTeam: { id: number; name: string; logo: string | null; shots?: unknown[]; topPlayers?: unknown[] };
  homeTeam: { id: number; name: string; logo: string | null; shots?: unknown[]; topPlayers?: unknown[] };
  league: { id: number; name: string; logo: string | null };
  venue?: { city: string; name: string; country: string; capacity: string };
  referee?: { name: string; nationality: string };
}

interface Highlight {
  id: number;
  embedUrl: string;
  title: string;
}

interface ApiResponse<T> {
  data: T[];
}

async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data: ApiResponse<T> = await res.json();
    return data.data[0] || null;
  } catch {
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await fetchData<MatchDetail>(`http://localhost:3000/api/matches/${id}`);
  const highlight = await fetchData<Highlight>(`http://localhost:3000/api/highlights?matchId=${id}`);

  if (!match) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <EmptyState title="Match not found" />
      </div>
    );
  }

  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 sm:p-6 mb-6 border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
          <span className="text-xs sm:text-sm text-zinc-500">{match.league.name}</span>
          <span className="text-xs sm:text-sm text-zinc-500">{formattedDate}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4 sm:mb-6">
          <div className="flex flex-col items-center w-full sm:w-auto">
            <Link href={`/teams/${match.homeTeam.id}`} className="flex flex-col items-center gap-2 hover:opacity-75 transition-opacity min-w-[44px]">
              {match.homeTeam.logo ? (
                <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
              )}
              <span className="font-medium text-center text-sm sm:text-base">{match.homeTeam.name}</span>
            </Link>
          </div>

          <div className="text-center">
            {match.state.description === 'Not started' ? (
              <span className="text-xl sm:text-2xl font-bold text-zinc-400">vs</span>
            ) : (
              <span className="text-2xl sm:text-3xl font-bold">
                {match.state.score?.current?.split('-')[0] || '-'} - {match.state.score?.current?.split('-')[1] || '-'}
              </span>
            )}
            <div className="mt-1 sm:mt-2">
              <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                {match.state.description}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center w-full sm:w-auto">
            <Link href={`/teams/${match.awayTeam.id}`} className="flex flex-col items-center gap-2 hover:opacity-75 transition-opacity min-w-[44px]">
              {match.awayTeam.logo ? (
                <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
              )}
              <span className="font-medium text-center text-sm sm:text-base">{match.awayTeam.name}</span>
            </Link>
          </div>
        </div>

        {match.venue && (
          <div className="text-center text-xs sm:text-sm text-zinc-500 mb-1 sm:mb-2">
            {match.venue.name}, {match.venue.city}
          </div>
        )}

        {match.referee && (
          <div className="text-center text-xs sm:text-sm text-zinc-500">
            Referee: {match.referee.name} ({match.referee.nationality})
          </div>
        )}
      </div>

      {highlight ? (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-zinc-900 dark:text-white">Highlights</h2>
          <div className="aspect-video">
            <iframe
              src={highlight.embedUrl}
              title={highlight.title}
              className="w-full h-full rounded"
              allowFullScreen
            />
          </div>
        </div>
      ) : match.state.description !== 'Not started' ? (
        <EmptyState title="No highlight available for this match" />
      ) : null}
    </div>
  );
}