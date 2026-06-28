import { NextResponse } from 'next/server';
import { mockLeagues, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const league = mockLeagues.find(l => l.id === Number(id));
  if (!league) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  return NextResponse.json(paginated([league]));
}
