import { Moment } from "moment";

export interface WeatherData {
    temp: number;
    description: string;
}

export interface WeatherResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Rain {
    "1h": number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export const isWeatherData = (data: unknown): data is WeatherData => {
    return (
        !!data &&
        typeof data === "object" &&
        typeof (data as { temp?: number })?.temp === "number" &&
        typeof (data as { description?: string })?.description === "string"
    );
};

export type WeatherCache = {
    [lang: string]: { weather: WeatherData; date: Moment };
};
