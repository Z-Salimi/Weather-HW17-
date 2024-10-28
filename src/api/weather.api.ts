import { IWeatherType } from "../types/teyps";
import { generateWeather } from "./client";
import { Urls } from "./urls";

interface fetchWeatherGlobal  {
    locations: IWeatherType[];
  }
  
  type fetchWeatherListType = (lat: number,lon:number) => Promise<fetchWeatherGlobal>;

export const fetchWeather:fetchWeatherListType= async (lat:number,lon:number) => {
    const client = generateWeather();
    const response = await client.get(Urls.weather.list(lat,lon));
    return response.data;
  };