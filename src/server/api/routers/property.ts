import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  getPropertyDetails as zillowPropertyDetails,
  getPropertyImages,
  getPropertySaleComps,
} from "@/lib/zillow";
import { getPropertyDetails } from "@/lib/rent-cast";

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
      const propertyDetails = await zillowPropertyDetails(address);
      const propertyImages = await getPropertyImages(propertyDetails.zpid);
      const rentCastProperties = await getPropertyDetails(address);
      if (rentCastProperties.length < 0) return null;
      const property = await ctx.db.property.create({
        data: {
          rentCastId: rentCastProperties[0].id,
          bedrooms: rentCastProperties[0].bedrooms,
          bathrooms: rentCastProperties[0].bathrooms,
          lotSize: rentCastProperties[0].lotSize,
          squareFootage: rentCastProperties[0].squareFootage,
          yearBuilt: rentCastProperties[0].yearBuilt,
          subdivision: rentCastProperties[0].subdivision,
          legalDescription: rentCastProperties[0].legalDescription,
          imageUrl: "/no-image-available.jpg",
          user: {
            connect: {
              id: ctx.user.userId!,
            },
          },
          address: {
            create: {
              street: rentCastProperties[0].addressLine1,
              city: rentCastProperties[0].city,
              state: rentCastProperties[0].state,
              postalCode: rentCastProperties[0].zipCode,
              county: rentCastProperties[0].county,
              longitude: rentCastProperties[0].longitude,
              latitude: rentCastProperties[0].latitude,
            },
          },
          taxAssessments: {
            createMany: {
              data: Object.values(rentCastProperties[0].taxAssessments),
            },
          },
          propertyTaxes: {
            createMany: {
              data: Object.values(rentCastProperties[0].propertyTaxes),
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
