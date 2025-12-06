'use client';

import type { WeatherData } from '@/interfaces/Weather';
import axios, { AxiosError } from 'axios';
import { Spinner } from 'flowbite-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

const WeatherInfo = () => {
  const lang = useLocale();
  const t = useTranslations('homepage');

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const isFetchingWeather = useRef(false);

  useEffect(() => {
    async function getWeather() {
      if (isFetchingWeather.current) return;
      isFetchingWeather.current = true;
      try {
        const { data } = await axios.get('/api/weather', {
          params: {
            lang,
          },
        });
        setWeather(data);
      } catch (err) {
        console.error(
          (err instanceof AxiosError && err?.response?.data) || err,
        );
      }
    }
    getWeather();
  }, [lang]);

  return (
    <span className='text-gray-300'>
      {weather ? (
        <>
          {`(${t('nowItIs')} ${Math.round(weather.temp)}°C `}
          {weather.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description || 'weather icon'}
              className='inline h-8 w-8 -mx-1 mb-[1px] -mt-[1px]'
            />
          )}
          {')'}
        </>
      ) : (
        <Spinner />
      )}
    </span>
  );
};

export default WeatherInfo;
