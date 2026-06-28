import { NextResponse } from 'next/server';
import { mockCountries, paginated } from '@/lib/real-data';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const data = name ? mockCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase())) : mockCountries;
  return NextResponse.json(paginated(data));
}
