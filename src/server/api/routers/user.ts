import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '../trpc';

export const userRouter = createTRPCRouter({
  getUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === 'admin',
      isActive: !user.banned,
    }));
  }),
  getUserById: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      return user;
    }),
  updateUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
        isActive: z.boolean(),
        isAdmin: z.boolean(),
        firstName: z.string(),
        lastName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          banned: !input.isActive,
          email: input.email,
          role: input.isAdmin ? 'admin' : 'user',
          name: `${input.firstName} ${input.lastName}`,
        },
      });
    }),
  deleteUser: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.delete({
        where: { id: input.userId },
      });
    }),
});
