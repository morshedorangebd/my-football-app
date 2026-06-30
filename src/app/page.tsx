import { MatchCard } from '@/components/MatchCard';
import { HighlightCard } from '@/components/HighlightCard';
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

export default async function Home() {
  const matches = await fetchData<{
    id: number;
    homeTeam: { id: number; name: string; logo: string };
    awayTeam: { id: number; name: string; logo: string };
    league: { id: number; name: string; logo: string | null };
    date: string;
    state: { description: string; score?: { current?: string | null } };
  }>('http://localhost:3000/api/matches?limit=10');

  const highlights = await fetchData<{
    id: number;
    imgUrl: string;
    title: string;
    channel: string;
    match: {
      id: number;
      homeTeam: { id: number; name: string; logo: string };
      awayTeam: { id: number; name: string; logo: string };
      league: { id: number; name: string };
    };
  }>('http://localhost:3000/api/highlights?limit=6');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white">Top Upcoming Matches</h2>
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
          <EmptyState title="No matches available" />
        )}
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white">Latest Highlights</h2>
        {highlights.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {highlights.map((highlight) => (
              <HighlightCard
                key={highlight.id}
                id={highlight.id}
                imgUrl={highlight.imgUrl}
                title={highlight.title}
                channel={highlight.channel}
                match={highlight.match}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No highlights available" />
        )}
      </section>
    </div>
  );
}