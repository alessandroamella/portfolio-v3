import axios, { isAxiosError } from "axios";
import { envs } from "../config/envs";
import { logger } from "../shared/logger";
import {
    WeatherData,
    WeatherResponse,
    isWeatherData,
} from "../interfaces/Weather";
import { mapLngToOWALng } from "../shared/mapLngToOWALng";

interface IProps {
    lat: number;
    lon: number;
    lang: string;
}
export const getWeather = async ({
    lat,
    lon,
    lang,
}: IProps): Promise<WeatherData> => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${mapLngToOWALng(
            lang,
        )}&appid=${envs.WEATHER_API_KEY}`;
        const { data } = await axios.get<WeatherResponse>(url);
        const weatherData: WeatherData = {
            temp: data.main.temp,
            description: data.weather[0]?.description,
        };
        if (!isWeatherData(weatherData)) {
            logger.error("Invalid weather data received from API:");
            logger.error(
                typeof data === "string" ? data : JSON.stringify(data),
            );
            throw new Error("Invalid weather data received from API");
        }
        logger.debug(
            "Weather data received from API: " + JSON.stringify(weatherData),
        );
        return weatherData;
    } catch (err) {
        logger.error("Error while getting weather:");
        const errStr =
            (isAxiosError(err) && err?.response?.data?.message) || err;
        logger.error(
            typeof errStr === "string" ? errStr : JSON.stringify(errStr),
        );
        throw new Error(errStr);
    }
};
