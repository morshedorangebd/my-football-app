import { NextResponse } from 'next/server';
import { mockMatches, paginated, mockEvents, mockStatistics } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = mockMatches.find(m => m.id === Number(id));
  if (!match) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  const detailed = {
    ...match,
    awayTeam: { ...match.awayTeam, shots: [], topPlayers: [] },
    homeTeam: { ...match.homeTeam, shots: [], topPlayers: [] },
    events: mockEvents,
    statistics: mockStatistics,
    referee: { name: 'A. Taylor', nationality: 'England' },
    venue: { city: 'Manchester', name: 'Old Trafford', country: 'England', capacity: '74310' },
    forecast: { status: 'clear', temperature: '18°C' },
    predictions: { prematch: [{ type: 'prematch', modelType: 'three-way', generatedAt: '2024-08-18T14:00:00.000Z', description: 'Home team likely to win.', probabilities: { home: '60.00%', draw: '20.00%', away: '20.00%' } }], live: [] },
    news: [],
  };
  return NextResponse.json(paginated([detailed]));
}
