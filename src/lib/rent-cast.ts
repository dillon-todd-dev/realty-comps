import { env } from "@/env";
import axios from "axios";

export const getPropertyDetails = async (address: string) => {
  const url = `${env.RENT_CAST_API_URL}/properties?address=${address}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "X-Api-Key": env.RENT_CAST_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.log("error getting property data", error);
    return null;
  }
};

export const getListingDetails = async (rentCastId: string) => {
  const url = `${env.RENT_CAST_API_URL}/listings/sale/${rentCastId}}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "X-Api-Key": env.RENT_CAST_API_KEY,
      },
    });
  } catch (error) {
    console.error("error getting listing details", error);
    return null;
  }
};
