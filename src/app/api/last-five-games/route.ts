import { NextResponse } from 'next/server';
import { mockMatches, paginated } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamId = url.searchParams.get('teamId');
  if (!teamId) return NextResponse.json({ message: 'teamId is required', statusCode: 400 }, { status: 400 });
  return NextResponse.json(paginated(mockMatches.slice(0, 5)));
}
