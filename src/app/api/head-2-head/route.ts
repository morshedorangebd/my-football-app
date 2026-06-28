import { NextResponse } from 'next/server';
import { mockMatches, paginated } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamIdOne = url.searchParams.get('teamIdOne');
  const teamIdTwo = url.searchParams.get('teamIdTwo');
  if (!teamIdOne || !teamIdTwo) return NextResponse.json({ message: 'teamIdOne and teamIdTwo are required', statusCode: 400 }, { status: 400 });
  return NextResponse.json(paginated(mockMatches));
}
