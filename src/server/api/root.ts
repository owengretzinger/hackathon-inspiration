import { createTRPCRouter } from "~/server/api/trpc";
import { inspirationRouter } from "./routers/inspiration";
import { createCallerFactory } from "~/server/api/trpc";
import { hackathonScraperRouter } from "./routers/hackathon-scraper";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  inspiration: inspirationRouter,
  hackathonScraper: hackathonScraperRouter,
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
