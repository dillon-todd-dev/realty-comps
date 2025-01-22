import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getUsers: adminProcedure.query(async ({ ctx }) => {
    console.log(ctx.user);
    const users = await ctx.db.user.findMany();
    return users.map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      isActive: !user.banned,
    }));
  }),
});
