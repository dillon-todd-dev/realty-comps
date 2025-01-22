import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { getPropertyDetails as getRentCastPropertyDetails } from '@/lib/rent-cast';
import { getStreetViewImage } from '@/lib/google';

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
      console.log(ctx.user);
      const address = `${input.streetAddress}, ${input.city}, ${input.state}, ${input.postalCode}`;
      const [propertyDetails, imageUrl] = await Promise.all([
        getRentCastPropertyDetails(address),
        getStreetViewImage(address),
      ]);

      if (!propertyDetails) {
        return null;
      }

      const property = await ctx.db.property.create({
        data: {
          rentCastId: propertyDetails[0].id,
          bedrooms: propertyDetails[0].bedrooms,
          bathrooms: propertyDetails[0].bathrooms,
          lotSize: propertyDetails[0].lotSize,
          squareFootage: propertyDetails[0].squareFootage,
          yearBuilt: propertyDetails[0].yearBuilt,
          subdivision: propertyDetails[0].subdivision,
          legalDescription: propertyDetails[0].legalDescription,
          imageUrl: imageUrl,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
          address: {
            create: {
              street: propertyDetails[0].addressLine1,
              city: propertyDetails[0].city,
              state: propertyDetails[0].state,
              postalCode: propertyDetails[0].zipCode,
              county: propertyDetails[0].county,
              longitude: propertyDetails[0].longitude,
              latitude: propertyDetails[0].latitude,
            },
          },
          taxAssessments: {
            createMany: {
              data: Object.values(propertyDetails[0].taxAssessments),
            },
          },
          propertyTaxes: {
            createMany: {
              data: Object.values(propertyDetails[0].propertyTaxes),
            },
          },
        },
      });
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
            userId: ctx.user.id,
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
        where: { userId: ctx.user.id, id: input.propertyId },
        include: { evaluations: true, address: true },
      });
      return property;
    }),
});
