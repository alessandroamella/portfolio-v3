import { config as appConfig } from '@/config';
import { envs } from '@/config/envs';
import {
  type WeatherData,
  type WeatherResponse,
  isWeatherData,
} from '@/interfaces/Weather';
import { mapLngToOWALng } from '@/utils/mapLngToOWALng';
import axios, { isAxiosError } from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

const { lat, lon } = appConfig.coords;

const languages = appConfig.languages.map((language) => language.value);

async function fetchWeatherFromAPI(language: string): Promise<WeatherData> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${mapLngToOWALng(language)}&appid=${envs.WEATHER_API_KEY}`;
    const { data } = await axios.get<WeatherResponse>(url);
    const weatherData: WeatherData = {
      temp: data.main.temp,
      description: data.weather[0]?.description,
    };
    if (!isWeatherData(weatherData)) {
      console.error('Invalid weather data received from API:', data);
      throw new Error('Invalid weather data received from API');
    }
    console.debug(
      `Weather data received from API: ${JSON.stringify(weatherData)}`,
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
