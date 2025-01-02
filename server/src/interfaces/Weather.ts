import { Moment } from "moment";

export interface WeatherData {
    temp: number;
    description: string;
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
