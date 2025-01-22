import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { getAutocompleteSuggestions, getPlaceDetails } from '@/lib/google';

export const googlePlacesRouter = createTRPCRouter({
  autocompleteSuggestions: protectedProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(async ({ input }) => {
      return await getAutocompleteSuggestions(input.searchInput);
    }),
  placeDetails: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ input }) => {
      return await getPlaceDetails(input.placeId);
    }),
});
