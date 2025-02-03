import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { newsletterSubscribers } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const newsletterRouter = createTRPCRouter({
  subscribeToNewsletter: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingSubscriber =
        await ctx.db.query.newsletterSubscribers.findFirst({
          where: eq(newsletterSubscribers.email, input.email),
        });

      // If not already subscribed, add to database
      if (!existingSubscriber) {
        await ctx.db.insert(newsletterSubscribers).values({
          email: input.email,
        });
      }

      // Always return success, whether new subscription or already subscribed
      return { success: true };
    }),
});
