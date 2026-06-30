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

export const dynamic = 'force-dynamic';

export default async function HighlightsPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; league?: string; highlight?: string }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();

  const data = await fetchData<{
    id: number;
    imgUrl: string;
    title: string;
    channel: string;
    embedUrl?: string;
    match: {
      id: number;
      homeTeam: { id: number; name: string; logo: string };
      awayTeam: { id: number; name: string; logo: string };
      league: { id: number; name: string };
    };
  }>(`http://localhost:3000/api/highlights?${query}`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {params.highlight ? (
        <HighlightDetail highlights={data} />
      ) : (
        <HighlightsGrid highlights={data} />
      )}
    </div>
  );
}

function HighlightsGrid({ highlights }: { highlights: { id: number; imgUrl: string; title: string; channel: string; match: { id: number; homeTeam: { id: number; name: string; logo: string }; awayTeam: { id: number; name: string; logo: string }; league: { id: number; name: string } } }[] }) {
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-zinc-900 dark:text-white">Video Gallery</h1>
      {highlights.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {highlights.map((h) => (
            <HighlightCard
              key={h.id}
              id={h.id}
              imgUrl={h.imgUrl}
              title={h.title}
              channel={h.channel}
              match={h.match}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No highlights found" />
      )}
    </>
  );
}

function HighlightDetail({ highlights }: { highlights: { id: number; embedUrl?: string; title: string }[] }) {
  const highlight = highlights[0];
  if (!highlight?.embedUrl) {
    return <EmptyState title="Highlight not found" />;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="aspect-video">
          <iframe
            src={highlight.embedUrl}
            title={highlight.title}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
        <div className="p-3 sm:p-4">
          <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">{highlight.title}</h1>
        </div>
      </div>
    </div>
  );
}