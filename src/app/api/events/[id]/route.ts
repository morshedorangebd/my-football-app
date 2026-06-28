import { NextResponse } from 'next/server';
import { mockEvents, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json(paginated(mockEvents));
}
