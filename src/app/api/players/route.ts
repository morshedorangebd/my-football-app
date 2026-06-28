import { NextResponse } from 'next/server';
import { mockPlayers, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { name, limit, offset } = Object.fromEntries(url.searchParams);
  let data = mockPlayers;
  if (name) data = data.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  const lim = limit ? Number(limit) : 1000;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
