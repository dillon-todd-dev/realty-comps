import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const evaluationRouter = createTRPCRouter({
  createEvaluation: protectedProcedure
    .input(z.object({ propertyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const evaluation = await ctx.db.evaluation.create({
        data: {
          property: {
            connect: { id: input.propertyId },
          },
        },
      });
      return evaluation;
    }),
  getEvaluations: protectedProcedure
    .input(z.object({ propertyId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.evaluation.findMany({
        where: {
          propertyId: input.propertyId,
        },
      });
    }),
  getEvaluationById: protectedProcedure
    .input(z.object({ evaluationId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.evaluation.findUnique({
        where: { id: input.evaluationId },
        include: { property: true },
      });
    }),
  deleteEvaluation: protectedProcedure
    .input(z.object({ evaluationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.evaluation.delete({
        where: { id: input.evaluationId },
      });
    }),
});
