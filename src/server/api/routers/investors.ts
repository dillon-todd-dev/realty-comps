import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '../trpc';
import { TRPCError } from '@trpc/server';

export const investorRouter = createTRPCRouter({
  getInvestors: adminProcedure
    .input(
      z.object({ fromDate: z.string(), toDate: z.string(), page: z.number() }),
    )
    .query(async ({ ctx, input }) => {
      const { fromDate, toDate, page } = input;
      const pageSize = 20;
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
              $facet: {
                data: [
                  { $sort: { count: -1 } },
                  { $skip: (page - 1) * pageSize },
                  { $limit: pageSize },
                ],
                totalCount: [{ $count: 'count' }],
              },
            },
          ])
          .toArray();

        if (!results || results.length === 0) {
          return { investors: [], hasMore: false };
        }

        const investors = results[0]?.data;
        const totalInvestors = results[0]?.totalCount[0]?.count ?? 0;

        return {
          investors,
          hasMore: totalInvestors > page * pageSize,
        };
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error fetching investor count',
          cause: err,
        });
      }
    }),
});
