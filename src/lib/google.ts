import axios from "axios";
import { env } from "@/env";

export const getAutocompleteSuggestions = async (searchInput: string) => {
  const url = "https://places.googleapis.com/v1/places:autocomplete";
  const primaryTypes = [
    "street_address",
    "subpremise",
    "route",
    "street_number",
    "landmark",
  ];

  try {
    const { data } = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
      },
      data: {
        input: searchInput,
        includedPrimaryTypes: primaryTypes,
        includeRegionCodes: ["US"],
      },
    });

    return data;
  } catch (error) {
    console.log("request is failing... not sure why");
    return {};
  }
};
