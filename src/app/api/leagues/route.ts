import { NextResponse } from 'next/server';
import { mockLeagues, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { leagueName, countryCode, countryName, limit, offset, season } = Object.fromEntries(url.searchParams);
  let data = mockLeagues;
  if (leagueName) data = data.filter(l => l.name.toLowerCase().includes(leagueName.toLowerCase()));
  if (countryCode) data = data.filter(l => l.country.code === countryCode);
  if (countryName) data = data.filter(l => l.country.name.toLowerCase().includes(countryName.toLowerCase()));
  if (season) data = data.filter(l => l.seasons.some(s => s.season === Number(season)));
  const lim = limit ? Number(limit) : 100;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
