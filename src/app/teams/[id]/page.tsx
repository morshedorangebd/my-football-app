import { EmptyState } from '@/components/EmptyState';
import Image from 'next/image';

interface TeamDetail {
  id: number;
  name: string;
  logo: string;
}

interface TeamStats {
  leagueName: string;
  season: number;
  total: { games: { played: number; wins: number; loses: number; draws: number }; goals: { scored: number; received: number } };
  home: { games: { played: number; wins: number; loses: number; draws: number }; goals: { scored: number; received: number } };
  away: { games: { played: number; wins: number; loses: number; draws: number }; goals: { scored: number; received: number } };
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

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const team = await fetchData<TeamDetail>(`http://localhost:3000/api/teams/${id}`);
  const stats = await fetchData<TeamStats>(`http://localhost:3000/api/teams/statistics/${id}?fromDate=2024-08-01`);

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState title="Team not found" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-6 mb-8">
        <Image src={team.logo} alt={team.name} width={64} height={64} className="object-contain" />
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{team.name}</h1>
      </div>

      {stats ? (
        <StatsDisplay stats={stats} />
      ) : (
        <EmptyState title="Statistics Unavailable" description="Team statistics are not available on the current plan." />
      )}
    </div>
  );
}

function StatsDisplay({ stats }: { stats: TeamStats }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Overall Stats ({stats.season})</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Played</span>
            <span className="font-medium">{stats.total.games.played}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Wins</span>
            <span className="font-medium">{stats.total.games.wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Draws</span>
            <span className="font-medium">{stats.total.games.draws}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Losses</span>
            <span className="font-medium">{stats.total.games.loses}</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="text-zinc-500">Goals For</span>
            <span className="font-medium">{stats.total.goals.scored}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Goals Against</span>
            <span className="font-medium">{stats.total.goals.received}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Home Stats</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Played</span>
            <span className="font-medium">{stats.home.games.played}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Wins</span>
            <span className="font-medium">{stats.home.games.wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Goals For</span>
            <span className="font-medium">{stats.home.goals.scored}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Away Stats</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Played</span>
            <span className="font-medium">{stats.away.games.played}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Wins</span>
            <span className="font-medium">{stats.away.games.wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Goals For</span>
            <span className="font-medium">{stats.away.goals.scored}</span>
          </div>
        </div>
      </div>
    </div>
  );
}