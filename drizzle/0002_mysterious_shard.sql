-- First add the column as nullable
ALTER TABLE "winning_projects" ADD COLUMN "index" integer;

-- Update existing rows with sequential numbers
WITH indexed_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY "created_at") as row_num
  FROM "winning_projects"
)
UPDATE "winning_projects"
SET "index" = indexed_projects.row_num
FROM indexed_projects
WHERE winning_projects.id = indexed_projects.id;

-- Now make it not null and add the unique constraint
ALTER TABLE "winning_projects" ALTER COLUMN "index" SET NOT NULL;
ALTER TABLE "winning_projects" ADD CONSTRAINT "winning_projects_index_unique" UNIQUE("index");