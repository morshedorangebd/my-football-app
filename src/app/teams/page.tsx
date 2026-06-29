import { TeamBadge } from '@/components/TeamBadge';
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

export default async function TeamsPage() {
  const teams = await fetchData<{
    id: number;
    name: string;
    logo: string;
  }>('http://localhost:3000/api/teams?limit=100');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Teams</h1>

      {teams.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {teams.map((team) => (
            <TeamBadge key={team.id} id={team.id} name={team.name} logo={team.logo} size="lg" />
          ))}
        </div>
      ) : (
        <EmptyState title="No teams available" />
      )}
    </div>
  );
}