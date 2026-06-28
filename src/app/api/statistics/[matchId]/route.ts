import { NextResponse } from 'next/server';
import { mockStatistics, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ matchId: string }> }) {
  return NextResponse.json(paginated(mockStatistics));
}
