import { Ilocationtype } from "../types/teyps";
import { generateLocation } from "./client";
import { Urls } from "./urls";

interface fetchLocationGlobal  {
  locations: Ilocationtype[];
}

type fetchLocationsListType = (city: string) => Promise<fetchLocationGlobal>;

export const fetchLocation: fetchLocationsListType = async (city: string) => {
  const client = generateLocation();
  const response = await client.get(Urls.location.list(city));
  console.log(response.data);
  return response.data;
};
