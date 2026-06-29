import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import Image from 'next/image';

interface LeagueDetail {
  id: number;
  name: string;
  logo: string | null;
  country: { code: string; name: string; logo: string };
  seasons: { season: number }[];
}

interface ApiResponse<T> {
  data: T[];
}

export default async function LeagueHubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const leagueRes = await fetch(`http://localhost:3000/api/leagues/${id}`);
  const matchesRes = await fetch(`http://localhost:3000/api/matches?leagueId=${id}&limit=20`);

  if (!leagueRes.ok) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState title="League not found" />
      </div>
    );
  }

  const leagueData: ApiResponse<LeagueDetail> = await leagueRes.json();
  const league = leagueData.data[0];

  let matches: {
    id: number;
    homeTeam: { id: number; name: string; logo: string };
    awayTeam: { id: number; name: string; logo: string };
    league: { id: number; name: string; logo: string | null };
    date: string;
    state: { description: string; score?: { current?: string | null } };
  }[] = [];

  if (matchesRes.ok) {
    const matchesData: ApiResponse<typeof matches[0]> = await matchesRes.json();
    matches = matchesData.data;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        {league.logo && (
          <Image src={league.logo} alt={league.name} width={48} height={48} className="object-contain" />
        )}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{league.name}</h1>
          <p className="text-zinc-500">{league.country.name}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Matches</h2>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
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
        <EmptyState title="No matches in this league" />
      )}
    </div>
  );
}