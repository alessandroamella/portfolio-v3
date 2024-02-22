import { Moment } from "moment";

export interface WeatherData {
    temp: number;
    description: string;
}

export const isWeatherData = (data: any): data is WeatherData => {
    return typeof data?.temp === "number" && typeof data?.description === "string";
};

export type WeatherCache = { [lang: string]: { weather: WeatherData; date: Moment } };
