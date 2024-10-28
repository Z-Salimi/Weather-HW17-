import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import { Map } from "./Map";
import ReactCountryFlag from "react-country-flag";

export const IndexPage: React.FC = () => {
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [Code, setCode] = useState<number | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const debouncedCity = useDebounce(city, 500);

  //  const { data, isError, error } = useQuery({
  //       queryKey: ["fetching-posts"],
  //       queryFn: fetchPostsList,
  //     });
  //     React.useEffect(() => {
  //       if (!error || !isError) return;
  //       throw new Error(error.message);
  //     }, [error, isError]);

  const fetchLocationData = async (city: string) => {
    const res = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=f25687e43d1a4d84902711294e3c89cd`
    );
    const data = res.data.results[0];
    setPosition([data.geometry.lat, data.geometry.lng]);
    setCode(data.annotations.callingcode);

    const countryDetailsRes = await axios.get(
      `https://restcountries.com/v3.1/alpha/${data.components.country_code}`
    );
    console.log(res);
    const countryDetails = countryDetailsRes.data[0];
    setCountryCode(data.components.country_code);
    console.log(countryCode);
    setLocation({
      city:
        data.components.city || data.components.town || data.components.village,
      nativeName: countryDetails.name.nativeName
        ? Object.values(countryDetails.name.nativeName)[0].common
        : countryDetails.name.common,
      capital: countryDetails.capital[0],
      region: countryDetails.region,
      population: countryDetails.population,
      languages: countryDetails.languages
        ? Object.values(countryDetails.languages).join(", ")
        : "",
      lat: data.geometry.lat,
      lon: data.geometry.lng,
      formatted: data.formatted,
    });
    fetchWeatherData(data.geometry.lat, data.geometry.lng);
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=44c433216f021de965e83d3cc2218c78&units=metric`
    );
    setWeather(res.data);
    console.log(res);
  };

  useEffect(() => {
    if (debouncedCity) {
      fetchLocationData(debouncedCity);
    }
  }, [debouncedCity]);

 

  return (
    <section className="flex flex-col items-center gap-2 font-sans">
      {/* ======================= Header & search ========================== */}
      <div className="w-full bg-gray-700 py-4 flex flex-col justify-center items-center gap-y-4">
        <h2 className="font-semibold text-2xl text-yellow-400">
          Learning how to work with APIs
        </h2>
        <input
          type="search"
          placeholder="Search Country..."
          className="w-1/2 px-4 py-2 rounded-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {/* ======================= main ========================== */}
      <div className="w-full ">
        {/* ======================= ROW 1 ========================== */}
        <div className="w-full grid grid-cols-3 gap-3">
          {/* ======================= column 1 ========================== */}
          <div className="flex flex-col gap-y-2 p-4 justify-center bg-slate-500">
            {!location ? (
              <h3 className="text-white text-xl font-semibold px-3">
                Country Name
              </h3>
            ) : (
              <h3 className="text-white text-xl font-semibold px-3">
                {location.formatted}
              </h3>
            )}

            <div className="flex flex-col gap-y-2 p-4 justify-center text-gray-100">
              {location && weather ? (
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">Native Name:</span>
                  {location?.nativeName}
                </p>
              ) : (
                <p>
                  <span>Native Name: ---</span>
                </p>
              )}
              {location && weather ? (
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">Capital:</span>
                  {location?.capital}
                </p>
              ) : (
                <p>
                  <span>Capital: ---</span>
                </p>
              )}
              {location && weather ? (
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">Region:</span>
                  {location?.region}
                </p>
              ) : (
                <p>
                  <span>Region: ---</span>
                </p>
              )}
              {location && weather ? (
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">Population:</span>
                  {location?.population}
                </p>
              ) : (
                <p>
                  <span>Population: ---</span>
                </p>
              )}
              {location && weather ? (
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">Languages:</span>
                  {location?.languages}
                </p>
              ) : (
                <p>
                  <span>Languages: ---</span>
                </p>
              )}
              {location && weather ? (
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">Time Zone:</span>
                  {weather?.timezone}
                </p>
              ) : (
                <p>
                  <span>Time Zone: ---</span>
                </p>
              )}
            </div>
          </div>
          {/* ======================= column 2 ========================== */}
          <div className="">
            <div className="h-[20%] w-full flex justify-center items-center bg-gray-700">
              <h3 className="text-white text-lg font-semibold">CALLING CODE</h3>
            </div>
            <div className="bg-yellow-400 h-[80%] flex justify-center items-center">
              {location ? (
                <p className="text-9xl font-light">{Code}</p>
              ) : (
                <p className="text-9xl font-light">---</p>
              )}
            </div>
          </div>
          {/* ======================= column 3 ========================== */}
          <div className="flex justify-center items-center">
            {countryCode && (
              <ReactCountryFlag
                countryCode={countryCode.toUpperCase()}
                svg
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        </div>
        {/* ======================= ROW 2 ========================== */}
        <div className="w-full grid grid-cols-3 gap-3">
          {/* ======================= column 1 ========================== */}
          <div className="flex flex-col py-2 justify-center ">
            <div className="bg-slate-500 h-[5vw] w-full flex justify-center items-center">
              <h3 className="text-yellow-300 text-lg font-semibold">
                CAPITAL WEATHER REPORT
              </h3>
            </div>
            <div className="flex flex-col gap-y-2 p-4 justify-center ">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  className="size-20"
                />
                {location && weather ? (
                  <p className="text-yellow-400 text-md font-semibold pb-3">
                    {weather?.weather[0].description}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              {location && weather ? (
                <p>Wind Speed: {weather?.wind.speed} MS</p>
              ) : (
                <p>Wind Speed: ---</p>
              )}
              {location && weather ? (
                <p>Temperature: {weather?.main.temp}F</p>
              ) : (
                <p>Temperature: ---</p>
              )}
              {location && weather ? (
                <p>Humidity: {weather?.main.humidity}%</p>
              ) : (
                <p>Humidity: ---</p>
              )}
              {location && weather ? (
                <p>Visibility: {weather?.visibility} m</p>
              ) : (
                <p>Visibility: ---</p>
              )}
            </div>
          </div>
          {/* ======================= column 2 MAP ========================== */}
          <div className="col-span-2">
            <div className="w-[65vw] h-[45vh] py-2 overflow-hidden cursor-grab">
              <Map
               
                position={position || [51.505, -0.09]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
