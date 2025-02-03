import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '../trpc';

export const investorRouter = createTRPCRouter({
  getInvestors: adminProcedure.query(async ({ ctx }) => {
    return await ctx.mongo
      .collection('investors')
      .find({})
      .limit(5)
      .project({ fileNumber: 1, grantees: 1 })
      .toArray();
  }),
});
