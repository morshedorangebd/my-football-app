import { NextResponse } from 'next/server';
import { mockBookmakers, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bookmaker = mockBookmakers.find(b => b.id === Number(id));
  if (!bookmaker) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  return NextResponse.json(paginated([bookmaker]));
}
