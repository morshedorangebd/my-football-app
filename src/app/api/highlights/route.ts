import { NextResponse } from 'next/server';
import { mockHighlights, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { countryCode, countryName, leagueName, leagueId, date, timezone, season, matchId, homeTeamId, awayTeamId, homeTeamName, awayTeamName, limit, offset } = Object.fromEntries(url.searchParams);
  let data = mockHighlights;
  if (countryCode) data = data.filter(h => h.match.country.code === countryCode);
  if (countryName) data = data.filter(h => h.match.country.name.toLowerCase().includes(countryName.toLowerCase()));
  if (leagueName) data = data.filter(h => h.match.league.name.toLowerCase().includes(leagueName.toLowerCase()));
  if (leagueId) data = data.filter(h => h.match.league.id === Number(leagueId));
  if (date) data = data.filter(h => h.match.date.startsWith(date));
  if (season) data = data.filter(h => h.match.league.season === Number(season));
  if (matchId) data = data.filter(h => h.match.id === Number(matchId));
  if (homeTeamId) data = data.filter(h => h.match.homeTeam.id === Number(homeTeamId));
  if (awayTeamId) data = data.filter(h => h.match.awayTeam.id === Number(awayTeamId));
  if (homeTeamName) data = data.filter(h => h.match.homeTeam.name.toLowerCase().includes(homeTeamName.toLowerCase()));
  if (awayTeamName) data = data.filter(h => h.match.awayTeam.name.toLowerCase().includes(awayTeamName.toLowerCase()));
  const lim = limit ? Number(limit) : 40;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
