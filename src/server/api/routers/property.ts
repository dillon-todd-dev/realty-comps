import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
      console.log(input);
      return true;
    }),
  addressAutocomplete: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("place id", input.placeId);
      return "";
    }),
});
