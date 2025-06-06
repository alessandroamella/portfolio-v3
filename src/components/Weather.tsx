'use client';

import axios, { AxiosError } from 'axios';
import { useLocale } from 'next-intl';
import { type FC, useEffect, useRef, useState } from 'react';

export interface WeatherData {
  temp: number;
  description: string;
}

interface WeatherInfoProps {
  prefixStr: string;
}

const WeatherInfo: FC<WeatherInfoProps> = ({ prefixStr }) => {
  const lang = useLocale();

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
    weather && (
      <span className='text-gray-300'>{`(${prefixStr} ${new Intl.NumberFormat(lang).format(weather.temp)}°C, ${weather.description}).`}</span>
    )
  );
};

export default WeatherInfo;
