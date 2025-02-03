import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { propertyRouter } from './routers/property';
import { googlePlacesRouter } from './routers/google-places';
import { evaluationRouter } from './routers/evaluation';
import { userRouter } from './routers/user';
import { investorRouter } from './routers/investors';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  property: propertyRouter,
  googlePlaces: googlePlacesRouter,
  evaluation: evaluationRouter,
  user: userRouter,
  investor: investorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
