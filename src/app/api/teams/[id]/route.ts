import { NextResponse } from 'next/server';
import { mockTeams, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = mockTeams.find(t => t.id === Number(id));
  if (!team) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  return NextResponse.json(paginated([team]));
}
