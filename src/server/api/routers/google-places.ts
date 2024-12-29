import { string, z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getAutocompleteSuggestions, getPlaceDetails } from "@/lib/google";

export const googlePlacesRouter = createTRPCRouter({
  autocompleteSuggestions: protectedProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(async ({ ctx, input }) => {
      return await getAutocompleteSuggestions(input.searchInput);
    }),
  placeDetails: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await getPlaceDetails(input.placeId);
    }),
});
