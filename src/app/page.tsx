"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  ProjectHeader,
  ProjectGallery,
  ProjectDescription,
  ProjectFooter,
} from "~/components/project";
import { useProjects } from "~/lib/hooks/useProjects";

export default function InspirationPage() {
  const {
    projects,
    currentProject,
    isLoading,
    totalProjects,
    viewedProjectCount,
    handleNextProject,
  } = useProjects();

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    );
  }

  if (!projects?.length || !currentProject) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent>
            <div className="py-8 text-center">
              <h2 className="text-lg font-semibold">No Projects Found</h2>
              <p className="text-muted-foreground">
                Try scraping some hackathon projects first!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-8 p-8">
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <Card className="w-full">
          <ProjectHeader
            title={currentProject.title}
            demoVideo={currentProject.demoVideo}
            devpostUrl={currentProject.devpostUrl}
            githubUrl={currentProject.githubUrl}
            websiteUrl={currentProject.websiteUrl}
            engagement={currentProject.engagement}
            teamMembers={currentProject.teamMembers.map((member) => ({
              name: member.name ?? null,
              profileUrl: member.profileUrl ?? null,
              avatarUrl: member.avatarUrl ?? null,
            }))}
            tagline={currentProject.tagline ?? ""}
            awards={currentProject.awards}
            hackathonUrl={currentProject.hackathonUrl}
            hackathonName={currentProject.hackathonName}
          />

          <CardContent className="flex flex-col gap-6">
            <ProjectGallery
              title={currentProject.title}
              galleryImages={currentProject.galleryImages}
              thumbnail={currentProject.thumbnail}
            />

            <ProjectDescription description={currentProject.description} />

            <ProjectFooter
              technologies={currentProject.technologies}
              updatedAt={currentProject.updatedAt}
              viewedProjectCount={viewedProjectCount}
              totalProjects={totalProjects}
            />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button size="lg" onClick={handleNextProject} className="gap-2">
            Next Project
            <span className="rounded border px-2 py-0.5 text-xs">Space</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
