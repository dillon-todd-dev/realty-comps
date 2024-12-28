import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getAutocompleteSuggestions } from "@/lib/google";

export const googlePlacesRouter = createTRPCRouter({
  autocompleteSuggestions: protectedProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(async ({ ctx, input }) => {
      return await getAutocompleteSuggestions(input.searchInput);
    }),
});
