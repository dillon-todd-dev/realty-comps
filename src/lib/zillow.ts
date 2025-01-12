import { env } from "@/env";
import axios from "axios";

export const getPropertyDetails = async (address: string) => {
  const url = `${env.ZILLOW_API_URL}/property?address=${address}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
        "x-rapidapi-key": env.ZILLOW_API_KEY,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching property data", error);
    return null;
  }
};

export const getPropertyImages = async (zpid: string) => {
  const url = `${env.ZILLOW_API_URL}/images?zpid=${zpid}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
        "x-rapidapi-key": env.ZILLOW_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching property images", error);
    return null;
  }
};

export const getPropertySaleComps = async (zpid: number) => {
  const url = `${env.ZILLOW_API_URL}/propertyComps?zpid=${zpid}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
        "x-rapidapi-key": env.ZILLOW_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching sale comps", error);
    return null;
  }
};
