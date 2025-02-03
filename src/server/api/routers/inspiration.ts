import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "~/server/db";
import { winningProjects } from "~/server/db/schema";
import { sql } from "drizzle-orm";
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
      }),
    )
    .query(async ({ input }) => {
      // Using SQL's RANDOM() function to efficiently get random rows
      // Add OFFSET 0 to prevent query caching
      const randomProjects = await db.query.winningProjects.findMany({
        orderBy: sql`RANDOM() OFFSET 0`,
        limit: input.limit,
      });

      return randomProjects;
    }),

  getProjectByIndex: publicProcedure
    .input(
      z.object({
        index: z.number().min(1),
      }),
    )
    .query(async ({ input }) => {
      const project = await db.query.winningProjects.findFirst({
        where: (projects, { eq }) => eq(projects.index, input.index),
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Project with index ${input.index} not found`,
        });
      }

      return project;
    }),

  getTotalProjectCount: publicProcedure.query(async () => {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(winningProjects);
    return result[0]?.count ?? 0;
  }),
});
