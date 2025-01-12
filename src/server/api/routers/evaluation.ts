import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { getSaleComparables } from '@/lib/rent-cast';

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
        include: { property: { include: { address: true } } },
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
  updateConventionalFinancing: protectedProcedure
    .input(
      z.object({
        data: z.object({
          downPayment: z.number(),
          loanTerm: z.number(),
          interestRate: z.number(),
          lenderFees: z.number(),
          monthsOfTaxes: z.number(),
          mortgageInsurance: z.number(),
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
  updateHardMoneyFinancing: protectedProcedure
    .input(
      z.object({
        data: z.object({
          hardLoanToValue: z.number(),
          hardLenderFees: z.number(),
          hardInterestRate: z.number(),
          hardMonthsToRefi: z.number(),
          hardRollInLenderFees: z.boolean(),
          hardWeeksUntilLeased: z.number(),
          refiLoanToValue: z.number(),
          refiLoanTerm: z.number(),
          refiInterestRate: z.number(),
          refiLenderFees: z.number(),
          refiMonthsOfTaxes: z.number(),
          refiMortgageInsurance: z.number(),
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
  searchComparables: protectedProcedure
    .input(
      z.object({
        data: z.object({
          latitude: z.number(),
          longitude: z.number(),
          bedrooms: z.number(),
          bathrooms: z.number(),
          squareFootage: z.number(),
          maxRadius: z.number(),
          daysOld: z.number(),
        }),
        propertyId: z.string(),
        evaluationId: z.string(),
        type: z.enum(['SALE', 'RENT']),
      }),
    )
    .query(async ({ ctx, input }) => {
      const saleComparables = await getSaleComparables(input.data);
      if (!saleComparables) return null;

      await ctx.db.property.update({
        where: { id: input.propertyId },
        data: {
          price: saleComparables.price,
          priceRangeLow: saleComparables.priceRangeLow,
          priceRangeHigh: saleComparables.priceRangeHigh,
        },
      });

      const transaction = saleComparables.comparables.map((comparable: any) => {
        ctx.db.comparable.create({
          data: {
            rentCastId: comparable.id,
            bedrooms: comparable.bedrooms,
            bathrooms: comparable.bathrooms,
            squareFootage: comparable.squareFootage,
            lotSize: comparable.lotSize,
            yearBuilt: comparable.yearBuilt,
            price: comparable.price,
            listingType: comparable.listingType,
            listedDate: comparable.listedDate,
            removedDate: comparable.removedDate,
            lastSeenDate: comparable.lastSeenDate,
            daysOnMarket: comparable.daysOnMarket,
            distance: comparable.distance,
            daysOld: comparable.daysOld,
            correlation: comparable.correlation,
            address: {
              connectOrCreate: {
                where: {
                  street: comparable.street,
                },
                create: {
                  street: comparable.street,
                  city: comparable.city,
                  state: comparable.state,
                  postalCode: comparable.zipCode,
                  county: comparable.county,
                  latitude: comparable.latitude,
                  longitude: comparable.longitude,
                },
              },
            },
            evaluations: {
              create: {
                evaluation: {
                  connect: { id: input.evaluationId },
                },
                type: input.type,
              },
            },
          },
        });
      });

      const result = await ctx.db.$transaction(transaction);
      console.log(result);
    }),
});
