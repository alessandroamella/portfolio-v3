"use client";

import React, { FC, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useLocale, useTranslations } from "next-intl";

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

    useEffect(() => {
        async function getWeather() {
            try {
                const { data } = await axios.get("/api/weather", {
                    params: {
                        lang
                    }
                });
                setWeather(data);
            } catch (err) {
                console.error((err instanceof AxiosError && err?.response?.data) || err);
            }
        }
        getWeather();
    }, []);

    return (
        weather && (
            <span className="text-gray-300">{`(${prefixStr} ${weather.temp}°C, ${weather.description}).`}</span>
        )
    );
};

export default WeatherInfo;
