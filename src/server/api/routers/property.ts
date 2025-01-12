import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import {
  getPropertyDetails,
  getPropertyImages,
  getPropertySaleComps,
} from '@/lib/zillow';

export const propertyRouter = createTRPCRouter({
  createProperty: protectedProcedure
    .input(
      z.object({
        streetAddress: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const address = `${input.streetAddress}, ${input.city}, ${input.state}, ${input.postalCode}`;
      const propertyDetails = await getPropertyDetails(address);
      const propertyImages = await getPropertyImages(propertyDetails.zpid);
      const property = await ctx.db.property.create({
        data: {
          description: propertyDetails.description,
          imageUrl: propertyImages?.images[0] ?? '/no-image-available.jpg',
          mlsId: propertyDetails.mlsId,
          zpid: propertyDetails.zpid,
          listPrice: propertyDetails.price,
          annualHoa: propertyDetails.hoaFee,
          annualHomeownersInsurance: propertyDetails.annualHomeownersInsurance,
          annualPropertyTaxes: propertyDetails.annualPropertyTaxes,
          propertyTaxRate: propertyDetails.propertyTaxRate,
          beds: propertyDetails.bedrooms,
          baths: propertyDetails.bathrooms,
          squareFootage: propertyDetails.livingArea,
          yearBuilt: propertyDetails.yearBuilt,
          address: {
            create: {
              street: input.streetAddress,
              city: input.city,
              state: input.state,
              postalCode: input.postalCode,
              county: propertyDetails.county,
              latitude: propertyDetails.latitude,
              longitude: propertyDetails.longitude,
            },
          },
          user: {
            connect: {
              id: ctx.user.userId!,
            },
          },
        },
      });
      console.log(property);
      return property;
    }),
  getProperties: protectedProcedure
    .input(
      z.object({
        take: z.number().optional(),
        skip: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [properties, totalProperties] = await Promise.all([
        ctx.db.property.findMany({
          where: {
            userId: ctx.user.userId!,
          },
          skip: input.skip,
          take: input.take,
          include: { address: true },
        }),
        ctx.db.property.count(),
      ]);

      return { properties, totalProperties };
    }),
  getPropertyById: protectedProcedure
    .input(z.object({ propertyId: z.string() }))
    .query(async ({ ctx, input }) => {
      const property = await ctx.db.property.findUnique({
        where: { userId: ctx.user.userId!, id: input.propertyId },
        include: { evaluations: true, address: true },
      });
      return property;
    }),
  getSaleComps: protectedProcedure
    .input(z.object({ zpid: z.number() }))
    .query(async ({ ctx, input }) => {
      const saleComps = await getPropertySaleComps(Number(input.zpid));
    }),
});
