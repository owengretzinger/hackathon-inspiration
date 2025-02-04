import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "~/server/db";
import { winningProjects } from "~/server/db/schema";
import { sql, eq, inArray, notInArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const inspirationRouter = createTRPCRouter({
  getProjects: publicProcedure.query(async () => {
    return await db.query.winningProjects.findMany({
      orderBy: (projects, { asc }) => [asc(projects.index)],
    });
  }),

  getRandomProjects: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        exclude: z.array(z.number()).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const query = ctx.db
        .select()
        .from(winningProjects);

      if (input.exclude && input.exclude.length > 0) {
        query.where(notInArray(winningProjects.index, input.exclude));
      }

      return await query
        .orderBy(sql`RANDOM() OFFSET 0`)
        .limit(input.limit);
    }),

  getProjectByIndex: publicProcedure
    .input(z.object({ index: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(winningProjects)
        .where(eq(winningProjects.index, input.index))
        .limit(1);

      if (result.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No project found with index ${input.index}`,
        });
      }

      return result[0];
    }),

  getTotalProjectCount: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(winningProjects);
    return Number(result[0]?.count ?? 0);
  }),

  getProjectsByIndices: publicProcedure
    .input(z.object({ indices: z.array(z.number().min(1)) }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(winningProjects)
        .where(inArray(winningProjects.index, input.indices));

      return result;
    }),
});
