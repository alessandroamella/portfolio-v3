import { config as appConfig } from '@/config';
import { envs } from '@/config/envs';
import type { WeatherData, WeatherResponse } from '@/interfaces/Weather';
import axios, { isAxiosError } from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

const { lat, lon } = appConfig.coords;

const languages = appConfig.languages.map((language) => language.value);

/**
 * For some obscure reason, OpenWeatherAPI uses different language codes than the rest of the world.
 * @param lng - language code
 * @returns language code for OpenWeatherAPI
 */
function mapLngToOWALng(lng: string) {
  switch (lng) {
    case 'cs':
      return 'cz';
    default:
      return lng;
  }
}

async function fetchWeatherFromAPI(language: string): Promise<WeatherData> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${mapLngToOWALng(language)}&appid=${envs.WEATHER_API_KEY}`;
    const { data } = await axios.get<WeatherResponse>(url);
    console.debug(`Weather data received from API: ${JSON.stringify(data)}`);
    const weatherData: WeatherData = {
      temp: data.main.temp,
      description: data.weather[0]?.description,
      icon: data.weather[0]?.icon,
    };
    console.debug(
      `Weather data sent in response: ${JSON.stringify(weatherData)}`,
    );
    return weatherData;
  } catch (err) {
    const errStr =
      (isAxiosError(err) && err?.response?.data?.message) ||
      (err as Error).message ||
      String(err);
    console.error('Error while getting weather:', errStr);
    throw new Error(errStr);
  }
}

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
