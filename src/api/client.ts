import axios from "axios";

const serverURL1 = "https://api.opencagedata.com";
export const generateLocation = () => {
  return axios.create({ baseURL: serverURL1 });
};
const serverURL2 = "https://api.openweathermap.org";
export const generateWeather = () => {
  return axios.create({ baseURL: serverURL2 });
};
