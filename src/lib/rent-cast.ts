import { env } from '@/env';
import axios from 'axios';

// export const getPropertyDetails = async (address: string) => {
//   const url = `${env.ZILLOW_API_URL}/property?address=${address}`;

//   try {
//     const { data } = await axios.get(url, {
//       headers: {
//         'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
//         'x-rapidapi-key': env.ZILLOW_API_KEY,
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error('Error fetching property data', error);
//     return null;
//   }
// };

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

console.log(
  await getPropertyDetails(
    '17375 Merigold Heights Drive, Conroe, Texas, 77302',
  ),
);
