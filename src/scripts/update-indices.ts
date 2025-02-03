import "dotenv/config";
import { winningProjects } from "~/server/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(DATABASE_URL);
const database = drizzle(client);

async function updateIndices() {
  console.log("🔄 Starting index update...");

  try {
    const projects = await database
      .select()
      .from(winningProjects)
      .orderBy(winningProjects.createdAt);

    console.log(`📊 Found ${projects.length} projects to update`);

    // Update each project with a sequential index
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      if (!project) continue;

      const newIndex = i + 1;

      await database
        .update(winningProjects)
        .set({ index: newIndex })
        .where(eq(winningProjects.id, project.id));

      console.log(`✅ Updated ${project.title} with index ${newIndex}`);
    }

    console.log("✨ Successfully updated all project indices!");
  } catch (error) {
    console.error("❌ Error updating indices:", error);
    process.exit(1);
  }

  await client.end();
  process.exit(0);
}

void updateIndices();
