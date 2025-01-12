import { env } from '@/env';
import axios from 'axios';

type SaleComparableInput = {
  longitude: number;
  latitude: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  maxRadius: number;
  daysOld: number;
};

export const getPropertyDetails = async (address: string) => {
  const url = `${env.RENT_CAST_API_URL}/properties?address=${address}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': env.RENT_CAST_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.log('error getting property data', error);
    return null;
  }
};

export const getListingDetails = async (rentCastId: string) => {
  const url = `${env.RENT_CAST_API_URL}/listings/sale/${rentCastId}}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': env.RENT_CAST_API_KEY,
      },
    });
  } catch (error) {
    console.error('error getting listing details', error);
    return null;
  }
};

export const getSaleComparables = async ({
  longitude,
  latitude,
  bedrooms,
  bathrooms,
  squareFootage,
  maxRadius,
  daysOld,
}: SaleComparableInput) => {
  const url = `${env.RENT_CAST_API_URL}/avm/value?longitude=${longitude}&latitude=${latitude}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&squareFootage=${squareFootage}&daysOld=${daysOld}&maxRadius=${maxRadius}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': env.RENT_CAST_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error('error getting sale comps', error);
    return null;
  }
};

// await getSaleComparables({
//   latitude: 32.75586,
//   longitude: -96.763007,
//   bedrooms: 2,
//   bathrooms: 1,
//   squareFootage: 672,
//   maxRadius: 50,
//   daysOld: 90,
// });
