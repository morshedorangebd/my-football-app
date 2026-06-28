import { NextResponse } from 'next/server';
import { mockPlayers, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = mockPlayers.find(p => p.id === Number(id));
  if (!player) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  const detailed = {
    id: player.id,
    name: player.name,
    fullName: player.fullName,
    logo: player.logo,
    profile: { fullName: player.fullName, birthDate: 'Feb 5, 1985', birthPlace: 'Lisbon', citizenship: 'Portugal', foot: 'right', height: '1,87 m', position: { main: 'Forward', secondary: 'Left Winger' }, club: { current: 'Al-Nassr', joinedAt: 'Jan 1, 2023', contractExpiry: 'Jun 30, 2025' } },
    rumours: { current: [], historical: [] },
    relatedNews: [],
    transfers: [],
    marketValue: [],
    injuries: [],
  };
  return NextResponse.json(paginated([detailed]));
}
