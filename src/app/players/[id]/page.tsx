import { EmptyState } from '@/components/EmptyState';

interface PlayerDetail {
  id: number;
  name: string;
  fullName: string;
  profile: {
    birthDate: string;
    birthPlace: string;
    citizenship: string;
    foot: string;
    height: string;
    position: { main: string; secondary: string };
    club: { current: string; joinedAt: string; contractExpiry: string };
  };
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

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const player = await fetchData<PlayerDetail>(`http://localhost:3000/api/players/${id}`);

  if (!player) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState title="Player not found" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-zinc-400">{player.name[0]}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{player.fullName}</h1>
          <p className="text-zinc-500">{player.profile.position.main}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Player Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Birth Date</span>
              <span>{player.profile.birthDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Birth Place</span>
              <span>{player.profile.birthPlace}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Citizenship</span>
              <span>{player.profile.citizenship}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Height</span>
              <span>{player.profile.height}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Position</span>
              <span>{player.profile.position.main}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Foot</span>
              <span>{player.profile.foot}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Current Club</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Club</span>
              <span>{player.profile.club.current}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Joined</span>
              <span>{player.profile.club.joinedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Contract Until</span>
              <span>{player.profile.club.contractExpiry}</span>
            </div>
          </div>
        </div>
      </div>

      <EmptyState title="Last 5 Games" description="Player match history is not available on the current plan." />
    </div>
  );
}