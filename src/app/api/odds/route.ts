import { NextResponse } from 'next/server';
import { mockOdds, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { oddsType, leagueId, leagueName, timezone, bookmakerId, limit, offset, matchId, bookmakerName, date } = Object.fromEntries(url.searchParams);
  let data = (mockOdds as Array<{odds?: unknown[]}>).filter(o => Array.isArray(o.odds));
  if (oddsType) data = data.filter(o => (o.odds as Array<{type?: string}>).some(odd => odd.type === oddsType));
  if (matchId) data = data.filter(o => (o as {matchId?: number}).matchId === Number(matchId));
  if (leagueId) data = data.filter(o => (o.odds as Array<{bookmakerId?: number}>).some(odd => odd.bookmakerId === Number(leagueId)));
  const lim = limit ? Number(limit) : 5;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
