import axios from 'axios';
import { env } from '@/env';

type PlacePrediction = {
  place: string;
  placeId: string;
  text: {
    text: string;
    matches: {
      offset: number;
    }[];
  };
};

type QueryPrediction = {
  text: {
    text: string;
    matches: {
      offset: number;
    }[];
  };
};

type AutocompleteSuggestions = {
  suggestions: {
    placePrediction: PlacePrediction[];
    queryPrediction: QueryPrediction[];
  }[];
};

type AutocompleteResponse = {};

type PlaceDetailsResponse = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

type StreetViewImageResponse = {
  url: string;
};

export const getAutocompleteSuggestions = async (
  searchInput: string,
): Promise<AutocompleteResponse | null> => {
  const url = 'https://places.googleapis.com/v1/places:autocomplete';
  const primaryTypes = [
    'street_address',
    'subpremise',
    'route',
    'street_number',
    'landmark',
  ];

  try {
    const { data }: { data: AutocompleteSuggestions } = await axios.post(
      url,
      {
        input: searchInput,
        includedPrimaryTypes: primaryTypes,
        includedRegionCodes: ['us'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': env.GOOGLE_API_KEY,
        },
      },
    );

    return data;
  } catch (error) {
    console.error('Failed to get autocomplete suggestions:', error);
    return null;
  }
};

export const getPlaceDetails = async (
  placeId: string,
): Promise<PlaceDetailsResponse | null> => {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        'X-Goog-Api-Key': env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'addressComponents,photos',
        'Content-Type': 'application/json',
      },
    });

    const findAddressPart = (str: string) => {
      const addressPart = data.addressComponents.find(
        (addressComponent: any) => {
          if (addressComponent.types.includes(str)) {
            return addressComponent;
          }
        },
      );

      return addressPart?.longText ?? '';
    };

    const streetNumber = findAddressPart('street_number');
    const streetName = findAddressPart('route');
    const city = findAddressPart('locality');
    const state = findAddressPart('administrative_area_level_1');
    const postalCode = findAddressPart('postal_code');

    return {
      street: `${streetNumber} ${streetName}`,
      city,
      state,
      postalCode,
    };
  } catch (error) {
    console.error('Failed to get place details:', error);
    return null;
  }
};

export const getStreetViewImage = async (
  address: string,
): Promise<StreetViewImageResponse | null> => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/streetview?location=${encodedAddress}&size=600x600&key=${env.GOOGLE_API_KEY}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        'X-Goog-Api-Key': env.GOOGLE_API_KEY,
      },
    });

    return data;
  } catch (error) {
    console.error('Failed to get street view image:', error);
    return null;
  }
};
