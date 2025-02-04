import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '../trpc';
import { TRPCError } from '@trpc/server';

export const investorRouter = createTRPCRouter({
  getInvestors: adminProcedure
    .input(z.object({ fromDate: z.string(), toDate: z.string() }))
    .query(async ({ ctx, input }) => {
      const { fromDate, toDate } = input;
      const collection = ctx.mongo.collection('investors');

      try {
        const results = await collection
          .aggregate([
            {
              $match: {
                fileDate: {
                  $gte: new Date(fromDate),
                  $lte: new Date(toDate),
                },
              },
            },
            {
              $unwind: '$grantees',
            },
            {
              $group: {
                _id: '$grantees',
                count: { $sum: 1 },
              },
            },
            {
              $sort: { count: -1 },
            },
          ])
          .limit(20)
          .toArray();

        console.log(results);

        return results;
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error fetching investor count',
          cause: err,
        });
      }
    }),
});
