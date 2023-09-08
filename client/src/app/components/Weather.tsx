"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export interface WeatherData {
    temp: number;
    description: string;
}

const WeatherInfo = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        async function getWeather() {
            try {
                const { data } = await axios.get("/api/weather");
                setWeather(data);
            } catch (err) {
                console.error((err instanceof AxiosError && err?.response?.data) || err);
            }
        }
        getWeather();
    }, []);

    return weather && <span>{`(${weather.temp}°C - ${weather.description}).`}</span>;
};

export default WeatherInfo;
