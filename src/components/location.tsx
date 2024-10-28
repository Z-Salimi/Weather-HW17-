// import React, { useEffect, useState } from "react";
// import { Ilocationtype, IWeatherType } from "../types/teyps";
// import ReactCountryFlag from "react-country-flag";
// import { useQuery } from "@tanstack/react-query";
// import { useDebounce } from "../hooks/useDebounce";
// import { fetchLocation } from "../api/location.api";
// import { fetchWeather } from "../api/weather.api";
// import { Map } from "./Map";

// export const LocationValue: React.FC = () => {
//   const [location, setLocation] = useState<Ilocationtype | null>(null);
//   const [weather, setWeather] = useState<IWeatherType | null>(null);
//   const [city, setCity] = useState("");
//   const debouncedCity = useDebounce(city, 500);
//   const { data, isError, error } = useQuery({
//     queryKey: ["fetching-location", debouncedCity],
//     queryFn: () => fetchLocation(debouncedCity),
//     enabled: !!debouncedCity,
//   });
//   useEffect(() => {
//     if (isError && error) {
//       throw new Error(error.message);
//     }
//     if (data) {
//       setLocation(data);
//       fetchWeather(
//         data.results[0].geometry.lat,
//         data.results[0].geometry.lng
//       ).then((res) => setWeather(res));
//     }
//   }, [data, isError, error]);
//   const handleMapClick = (lat: number, lon: number) => {
//     fetchWeather(lat, lon).then((res) => setWeather(res));
//   };
//   const capital = location?.results[0].annotations.timezone.name.split("/");
//   return(
//     <section>
//       <div className="w-full grid grid-cols-3 gap-3">
//         {/* ======================= column 1 ========================== */}
//         <div className="flex flex-col gap-y-2 p-4 justify-center bg-slate-500">
//           {!location ? (
//             <h3 className="text-white text-xl font-semibold px-3">
//               Country Name
//             </h3>
//           ) : (
//             <h3 className="text-white text-xl font-semibold px-3">
//               {location?.results[0].formatted}
//             </h3>
//           )}

//           <div className="flex flex-col gap-y-2 p-4 justify-center text-gray-100">
//             {location ? (
//               <p className="flex items-center gap-3">
//                 <span className="text-yellow-400">Native Name:</span>
//                 {location?.licenses[0].name}
//               </p>
//             ) : (
//               <p>
//                 <span>Native Name: ---</span>
//               </p>
//             )}
//             {capital ? (
//               <p className="flex items-center gap-3">
//                 <span className="text-yellow-400">Capital:</span>
//                 {capital[1]}
//               </p>
//             ) : (
//               <p>
//                 <span>Capital: ---</span>
//               </p>
//             )}
//             {capital ? (
//               <p className="flex items-center gap-3">
//                 <span className="text-yellow-400">Region:</span>
//                 {capital[0]}
//               </p>
//             ) : (
//               <p>
//                 <span>Region: ---</span>
//               </p>
//             )}
//             {/* {location && weather ? (
//               <p className="flex items-center gap-3">
//                 <span className="text-yellow-400">Population:</span>
//                 {location?.population}
//               </p>
//             ) : (
//               <p>
//                 <span>Population: ---</span>
//               </p>
//             )} */}
//             {/* {location && weather ? (
//               <p className="flex items-center gap-3">
//                 <span className="text-yellow-400">Languages:</span>
//                 {location?.languages}
//               </p>
//             ) : (
//               <p>
//                 <span>Languages: ---</span>
//               </p>
//             )} */}
//             {location ? (
//               <p className="flex items-center gap-3">
//                 <span className="text-yellow-400">Time Zone:</span>
//                 {location?.results[0].annotations.timezone.short_name}
//                 {location?.results[0].annotations.timezone.offset_string}
//               </p>
//             ) : (
//               <p>
//                 <span>Time Zone: ---</span>
//               </p>
//             )}
//           </div>
//         </div>
//         {/* ======================= column 2 ========================== */}
//         <div className="">
//           <div className="h-[20%] w-full flex justify-center items-center bg-gray-700">
//             <h3 className="text-white text-lg font-semibold">CALLING CODE</h3>
//           </div>
//           <div className="bg-yellow-400 h-[80%] flex justify-center items-center">
//             {location ? (
//               <p className="text-9xl font-light">
//                 {location?.results[0].annotations.callingcode}
//               </p>
//             ) : (
//               <p className="text-9xl font-light">---</p>
//             )}
//           </div>
//         </div>
//         {/* ======================= column 3 ========================== */}
//         <div className="flex justify-center items-center">
//           {location?.results[0].components.country_code && (
//             <ReactCountryFlag
//               countryCode={location?.results[0].components.country_code.toUpperCase()}
//               svg
//               style={{ width: "100%", height: "100%" }}
//             />
//           )}
//         </div>
//       </div>
//       {/* ======================= Row2 ========================== */}
//       <div className="w-full grid grid-cols-3 gap-3">
//         {/* ======================= column 1 ========================== */}
//         <div className="flex flex-col py-2 justify-center ">
//           <div className="bg-slate-500 h-[5vw] w-full flex justify-center items-center">
//             <h3 className="text-yellow-300 text-lg font-semibold">
//               CAPITAL WEATHER REPORT
//             </h3>
//           </div>
//           <div className="flex flex-col gap-y-2 p-4 justify-center ">
//             <div className="flex flex-col justify-center items-center">
//               <img
//                 src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
//                 alt="weather icon"
//                 className="size-20"
//               />
//               {weather ? (
//                 <p className="text-yellow-400 text-md font-semibold pb-3">
//                   {weather?.weather[0].description}
//                 </p>
//               ) : (
//                 <p></p>
//               )}
//             </div>

//             {weather ? (
//               <p>Wind Speed: {weather?.wind.speed} MS</p>
//             ) : (
//               <p>Wind Speed: ---</p>
//             )}
//             {weather ? (
//               <p>Temperature: {weather?.main.temp}F</p>
//             ) : (
//               <p>Temperature: ---</p>
//             )}
//             {weather ? (
//               <p>Humidity: {weather?.main.humidity}%</p>
//             ) : (
//               <p>Humidity: ---</p>
//             )}
//             {weather ? (
//               <p>Visibility: {weather?.visibility} m</p>
//             ) : (
//               <p>Visibility: ---</p>
//             )}
//           </div>
//         </div>
//         {/* ======================= column 2 MAP ========================== */}
//         <div className="col-span-2">
//           <div className="w-[65vw] h-[45vh] py-2 overflow-hidden cursor-grab">
//             <Map setLocation={handleMapClick}></Map>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
