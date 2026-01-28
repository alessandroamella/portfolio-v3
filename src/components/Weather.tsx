'use client';

import axios, { AxiosError } from 'axios';
import { Spinner, Tooltip } from 'flowbite-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import type { WeatherData } from '@/interfaces/Weather';

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
    <div className='text-gray-300 inline'>
      {weather ? (
        <>
          {`(${t('nowItIs')} ${Math.round(weather.temp)}°C `}
          {weather.icon && (
            <Tooltip
              className='weather-tooltip'
              content={weather.description || ''}
              placement='top'
            >
              <Image
                width={32}
                height={32}
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description || 'Weather icon'}
                className='inline h-8 w-8 -mx-1 mb-[1px] -mt-[1px]'
              />
            </Tooltip>
          )}
          {')'}
        </>
      ) : (
        <Spinner size='sm' />
      )}
    </div>
  );
};

export default WeatherInfo;
