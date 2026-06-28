import { NextResponse } from 'next/server';
import { mockTeams, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { name, type, limit, offset } = Object.fromEntries(url.searchParams);
  let data = mockTeams;
  if (name) data = data.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
  if (type) data = data.filter(t => t.type === type);
  const lim = limit ? Number(limit) : 500;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
