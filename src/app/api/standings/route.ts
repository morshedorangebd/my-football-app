import { NextResponse } from 'next/server';
import { mockStandings } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const leagueId = url.searchParams.get('leagueId');
  const season = url.searchParams.get('season');
  if (!leagueId || !season) return NextResponse.json({ message: 'leagueId and season are required', statusCode: 400 }, { status: 400 });
  return NextResponse.json(mockStandings);
}
