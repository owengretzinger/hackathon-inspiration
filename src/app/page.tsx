"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  ProjectHeader,
  ProjectGallery,
  ProjectDescription,
  ProjectFooter,
} from "~/components/project";
import { ProjectSkeleton } from "~/components/project/project-skeleton";
import { useProjects } from "~/lib/hooks/useProjects";
import { InfoCard } from "~/components/info-card";

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
      <div className="container mx-auto flex min-h-screen flex-col items-center gap-8 p-8">
        <div className="flex w-full max-w-4xl flex-col gap-4">
          <ProjectSkeleton />
          <div className="flex justify-center">
            <Button size="lg" disabled className="gap-2">
              Next Project
              <span className="rounded border px-2 py-0.5 text-xs">Space</span>
            </Button>
          </div>
        </div>
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
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-[1fr,400px]">
        <div className="flex flex-col gap-4">
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
        </div>

        <div className="flex flex-col gap-4">
          <InfoCard
            viewedProjectCount={viewedProjectCount ?? 0}
            totalProjects={totalProjects ?? 0}
            onNextProject={handleNextProject}
          />
        </div>
      </div>
    </div>
  );
}
