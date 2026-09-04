'use client';

import { Spinner, Tooltip } from 'flowbite-react';
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
        const res = await fetch(`/api/weather?lang=${lang}`);
        const data = await res.json();
        if (!res.ok) throw data;
        setWeather(data);
      } catch (err) {
        console.error(err);
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
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description || 'Weather icon'}
                className='inline h-8 w-8 -mx-1 mb-px -mt-px'
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
