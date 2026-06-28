import { NextResponse } from 'next/server';
import { mockPlayerStatistics, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stats = { ...mockPlayerStatistics, id: Number(id) };
  return NextResponse.json(paginated([stats]));
}
