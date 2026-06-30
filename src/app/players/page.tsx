import { EmptyState } from '@/components/EmptyState';

interface ApiResponse<T> {
  data: T[];
}

async function fetchData<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data: ApiResponse<T> = await res.json();
    return data.data;
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function PlayersPage() {
  const players = await fetchData<{
    id: number;
    name: string;
    fullName: string;
    logo: string | null;
  }>('http://localhost:3000/api/players?limit=100');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white">Players</h1>

      {players.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
          {players.map((player) => (
            <a key={player.id} href={`/players/${player.id}`} className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow transition-shadow min-w-[44px]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-zinc-400">{player.name[0]}</span>
              </div>
              <span className="text-xs font-medium text-center truncate" title={player.fullName || player.name}>
                {player.name}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <EmptyState title="No players available" />
      )}
    </div>
  );
}