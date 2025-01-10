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
  updateDealTerms: protectedProcedure
    .input(
      z.object({
        data: z.object({
          estimatedSalePrice: z.number(),
          sellerContribution: z.number(),
          repairs: z.number(),
          insurance: z.number(),
          rent: z.number(),
          hardAppraisedPrice: z.number(),
          survey: z.number(),
          hoa: z.number(),
          inspection: z.number(),
          maxRefiCashback: z.number(),
          purchasePrice: z.number(),
          appraisal: z.number(),
          propertyTax: z.number(),
          miscellaneous: z.number(),
        }),
        evaluationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.evaluation.update({
        where: { id: input.evaluationId },
        data: input.data,
      });
    }),
});
