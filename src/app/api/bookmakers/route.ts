import { NextResponse } from 'next/server';
import { mockBookmakers, mockPlan } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { name, limit, offset } = Object.fromEntries(url.searchParams);
  let data = mockBookmakers;
  if (name) data = data.filter(b => b.name.toLowerCase().includes(name.toLowerCase()));
  const lim = limit ? Number(limit) : 20;
  const off = offset ? Number(offset) : 0;
  return NextResponse.json({ data: data.slice(off, off + lim), pagination: { totalCount: data.length, offset: off, limit: lim }, plan: mockPlan });
}
