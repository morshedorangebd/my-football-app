import { NextResponse } from 'next/server';
import { mockPlan, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(request.url);
  const fromDate = url.searchParams.get('fromDate');
  if (!fromDate) return NextResponse.json({ message: 'fromDate is required', statusCode: 400 }, { status: 400 });
  const stats = {
    leagueId: 1,
    season: 2024,
    leagueName: 'Premier League',
    total: { games: { played: 30, wins: 20, loses: 5, draws: 5 }, goals: { scored: 60, received: 25 } },
    home: { games: { played: 15, wins: 12, loses: 1, draws: 2 }, goals: { scored: 35, received: 10 } },
    away: { games: { played: 15, wins: 8, loses: 4, draws: 3 }, goals: { scored: 25, received: 15 } },
  };
  return NextResponse.json(paginated([stats]));
}
