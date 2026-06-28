import { NextResponse } from 'next/server';
import { mockHighlights, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const highlight = mockHighlights.find(h => h.id === Number(id));
  if (!highlight) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  return NextResponse.json(paginated([highlight]));
}
