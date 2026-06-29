import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';

interface ApiResponse<T> {
  data: T[];
}

const countries = [
  { code: 'GB-ENG', name: 'England' },
  { code: 'ES', name: 'Spain' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'FR', name: 'France' },
  { code: 'BR', name: 'Brazil' },
];

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

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; league?: string; date?: string }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();

  const data = await fetchData<{
    id: number;
    homeTeam: { id: number; name: string; logo: string };
    awayTeam: { id: number; name: string; logo: string };
    league: { id: number; name: string; logo: string | null };
    date: string;
    state: { description: string; score?: { current?: string | null } };
  }>(`http://localhost:3000/api/matches?${query}`);

  const buildQuery = (newCountry?: string) => {
    const newParams: Record<string, string> = { ...params };
    if (newCountry) {
      newParams.country = newCountry;
    } else {
      delete newParams.country;
    }
    return new URLSearchParams(newParams).toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Fixtures</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href={`/matches?${buildQuery()}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !params.country
              ? 'bg-zinc-900 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          All
        </a>
        {countries.map((country) => (
          <a
            key={country.code}
            href={`/matches?${buildQuery(country.code)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              params.country === country.code
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {country.name}
          </a>
        ))}
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((match) => (
            <MatchCard
              key={match.id}
              id={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              league={match.league}
              date={match.date}
              state={match.state}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No matches found" />
      )}
    </div>
  );
}