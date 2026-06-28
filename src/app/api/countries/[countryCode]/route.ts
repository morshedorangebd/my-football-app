import { NextResponse } from 'next/server';
import { mockCountries, paginated } from '@/lib/real-data';

export async function GET(request: Request, { params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params;
  const country = mockCountries.find(c => c.code === countryCode);
  if (!country) return NextResponse.json({ message: 'Not Found', statusCode: 404 }, { status: 404 });
  return NextResponse.json(paginated([country]));
}
