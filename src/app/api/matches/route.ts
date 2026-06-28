import { NextResponse } from 'next/server';
import { mockMatches, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { leagueName, leagueId, date, timezone, season, homeTeamId, awayTeamId, homeTeamName, awayTeamName, countryCode, countryName, limit, offset } = Object.fromEntries(url.searchParams);
  let data = mockMatches;
  if (leagueName) data = data.filter(m => m.league.name.toLowerCase().includes(leagueName.toLowerCase()));
  if (leagueId) data = data.filter(m => m.league.id === Number(leagueId));
  if (date) data = data.filter(m => m.date.startsWith(date));
  if (season) data = data.filter(m => m.league.season === Number(season));
  if (homeTeamId) data = data.filter(m => m.homeTeam.id === Number(homeTeamId));
  if (awayTeamId) data = data.filter(m => m.awayTeam.id === Number(awayTeamId));
  if (homeTeamName) data = data.filter(m => m.homeTeam.name.toLowerCase().includes(homeTeamName.toLowerCase()));
  if (awayTeamName) data = data.filter(m => m.awayTeam.name.toLowerCase().includes(awayTeamName.toLowerCase()));
  if (countryCode) data = data.filter(m => m.country.code === countryCode);
  if (countryName) data = data.filter(m => m.country.name.toLowerCase().includes(countryName.toLowerCase()));
  const lim = limit ? Number(limit) : 100;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
