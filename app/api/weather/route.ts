import { NextRequest, NextResponse } from 'next/server';
import { getWeather } from '@/lib/weather';

export async function GET(request: NextRequest) {
  try {
    // Parse query params for lat/lon if provided
    const lat = request.nextUrl.searchParams.get('lat');
    const lon = request.nextUrl.searchParams.get('lon');

    const weather = await getWeather(
      lat ? parseFloat(lat) : undefined,
      lon ? parseFloat(lon) : undefined
    );

    return NextResponse.json(weather);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 500 }
    );
  }
}
