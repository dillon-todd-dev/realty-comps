import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getPropertyDetails, getPropertyImages } from "@/lib/zillow";
import { skip } from "node:test";

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
          userId: ctx.user.userId!,
          streetAddress: input.streetAddress,
          city: input.city,
          state: input.state,
          postalCode: input.postalCode,
          county: propertyDetails.county,
          latitude: propertyDetails.latitude,
          longitude: propertyDetails.longitude,
          imageUrl: propertyImages?.images[0],
          description: propertyDetails.description,
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
      return await ctx.db.property.findMany({
        where: {
          userId: ctx.user.userId!,
        },
        skip: input.skip,
        take: input.take,
      });
    }),
  getPropertyById: protectedProcedure
    .input(z.object({ propertyId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.property.findUnique({
        where: { userId: ctx.user.userId!, id: input.propertyId },
      });
    }),
});
