import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const restriction = { state: 'No restricitons applied', allowedCountries: [], blockedCountries: [], embeddable: true };
  return NextResponse.json(restriction);
}
