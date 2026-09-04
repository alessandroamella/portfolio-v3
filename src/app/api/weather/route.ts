import { type NextRequest, NextResponse } from 'next/server';
import { config as appConfig } from '@/config';
import { fetchWeatherFromAPI } from '@/lib/weather';

const languages = appConfig.languages.map((language) => language.value);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const langQuery = searchParams.get('lang');

  const lang = langQuery && languages.includes(langQuery) ? langQuery : 'en';

  try {
    const weather = await fetchWeatherFromAPI(lang);
    return NextResponse.json(weather, {
      status: 200,
      headers: {
        // cache on Vercel's Edge Network for 5 minutes
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('API Error fetching weather:', error);
    return NextResponse.json({ err: 'servererror.internal' }, { status: 500 });
  }
}
