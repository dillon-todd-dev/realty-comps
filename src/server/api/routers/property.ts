import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getPropertyDetails } from "@/lib/zillow";

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
      console.log(propertyDetails.zpid);
      return true;
    }),
  addressAutocomplete: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("place id", input.placeId);
      return "";
    }),
});
