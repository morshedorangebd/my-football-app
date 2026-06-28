import { NextResponse } from 'next/server';
import { mockLineups } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ matchId: string }> }) {
  return NextResponse.json(mockLineups);
}
