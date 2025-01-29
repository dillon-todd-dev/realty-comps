import { env } from '@/env';
import axios from 'axios';

type PropertyDetails = {
  id: string;
  formattedAddress: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  longitude: number;
  latitude: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  lotSize?: number;
  yearBuilt?: number;
  assessorId?: string;
  subdivision?: string;
  legalDescription?: string;
  zoning?: string;
  lastSaleDate?: Date;
  lastSalePrice?: number;
  hoa?: {
    fee?: number;
  };
  features?: {
    architectureType?: string;
    cooling?: boolean;
    coolingType?: string;
    exteriorType?: string;
    fireplace?: boolean;
    fireplaceType?: string;
    floorCount?: number;
    foundationType?: string;
    garage?: boolean;
    garageSpaces?: number;
    garageType?: string;
    heating?: boolean;
    heatingType?: string;
    pool?: boolean;
    poolType?: string;
    roofType?: string;
    roomCount?: number;
    unitCount?: number;
    viewType?: string;
  };
  taxAssessments?: {
    [key: string]: {
      year?: number;
      value?: number;
      land?: number;
      improvements?: number;
    }[];
  };
  propertyTaxes?: {
    [key: string]: {
      year?: number;
      total?: number;
    }[];
  };
  history?: {
    [key: string]: {
      event?: string;
      date?: Date;
      price?: number;
    };
  };
  owner?: {
    names?: string[];
    type?: string;
    mailingAddress?: {
      id?: string;
      formattedAddress?: string;
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
    ownerOccupied?: boolean;
  };
};

type PropertyDetailsResponse = {
  id: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  subdivision: string;
  legalDescription: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    county: string;
    longitude: number;
    latitude: number;
  };
  taxAssessments: {
    year: number;
    value: number;
    land?: number;
    improvements?: number;
  }[];
  propertyTaxes: {
    year: number;
    total: number;
  }[];
};

export const getPropertyDetails = async (
  address: string,
): Promise<PropertyDetailsResponse | null> => {
  const encodedAddress = encodeURIComponent(address);
  const url = `${env.RENT_CAST_API_URL}/properties?address=${encodedAddress}`;

  try {
    const { data }: { data: PropertyDetails[] } = await axios.get(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Api-Key': env.RENT_CAST_API_KEY,
      },
    });

    if (data.length === 0) return null;
    const property = data[0];

    return {
      id: property?.id ?? '',
      bedrooms: property?.bedrooms ?? 0,
      bathrooms: property?.bathrooms ?? 0,
      squareFootage: property?.squareFootage ?? 0,
      lotSize: property?.lotSize ?? 0,
      yearBuilt: property?.yearBuilt ?? 0,
      subdivision: property?.subdivision ?? '',
      legalDescription: property?.legalDescription ?? '',
      address: {
        street: property?.addressLine1 ?? '',
        city: property?.city ?? '',
        state: property?.state ?? '',
        postalCode: property?.zipCode ?? '',
        county: property?.county ?? '',
        longitude: property?.longitude ?? 0,
        latitude: property?.latitude ?? 0,
      },
      taxAssessments: property?.taxAssessments
        ? Object.values(property.taxAssessments)
            .flat()
            .map((assessment) => ({
              year: assessment.year ?? 0,
              value: assessment.value ?? 0,
              land: assessment.land,
              improvements: assessment.improvements,
            }))
        : [],
      propertyTaxes: property?.propertyTaxes
        ? Object.values(property.propertyTaxes)
            .flat()
            .map((tax) => ({
              year: tax.year ?? 0,
              total: tax.total ?? 0,
            }))
        : [],
    };
  } catch (error) {
    console.log('error getting property data', error);
    return null;
  }
};
