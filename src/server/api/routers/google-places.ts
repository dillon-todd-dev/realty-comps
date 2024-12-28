import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const googlePlacesRouter = createTRPCRouter({
  getAutocompleteSuggestions: protectedProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(async ({ ctx, input }) => {}),
});
