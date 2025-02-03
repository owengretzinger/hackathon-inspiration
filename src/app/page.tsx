"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  ProjectHeader,
  ProjectGallery,
  ProjectDescription,
  ProjectFooter,
  ProjectTechnologies,
} from "~/components/project";
import { ProjectSkeleton } from "~/components/project/project-skeleton";
import { useProjects } from "~/lib/hooks/useProjects";
import { InfoCard } from "~/components/info-card";

export default function InspirationPage() {
  const {
    currentProject,
    isLoading,
    totalProjects,
    handleNextProject,
    currentIndex,
  } = useProjects();

  // Show skeleton while loading
  if (isLoading || !totalProjects) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-8 sm:p-8">
        <div className="grid w-full max-w-[1600px] grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-[1fr,400px]">
          <div className="flex flex-col gap-4">
            <ProjectSkeleton />
          </div>
          <div className="flex flex-col-reverse md:flex-col gap-4 sm:gap-8">
            <InfoCard />
            <Button size="lg" disabled className="w-full gap-2">
              Next Project
              <span className="rounded border px-2 py-0.5 text-xs hidden md:block">Space</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Only show no projects if we're not loading and there are truly no projects
  if (!currentProject && totalProjects === 0) {
    return (
      <div className="container mx-auto p-4 sm:p-8">
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
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-8 sm:p-8">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-[1fr,400px]">
        <div className="flex flex-col gap-4">
          <Card className="w-full">
            <ProjectHeader
              title={currentProject!.title}
              demoVideo={currentProject!.demoVideo}
              devpostUrl={currentProject!.devpostUrl}
              githubUrl={currentProject!.githubUrl}
              websiteUrl={currentProject!.websiteUrl}
              engagement={currentProject!.engagement}
              teamMembers={currentProject!.teamMembers.map((member) => ({
                name: member.name ?? null,
                profileUrl: member.profileUrl ?? null,
                avatarUrl: member.avatarUrl ?? null,
              }))}
              tagline={currentProject!.tagline ?? ""}
              awards={currentProject!.awards}
              hackathonUrl={currentProject!.hackathonUrl}
              hackathonName={currentProject!.hackathonName}
            />

            <CardContent className="flex flex-col gap-6">
              <ProjectGallery
                title={currentProject!.title}
                galleryImages={currentProject!.galleryImages}
                thumbnail={currentProject!.thumbnail}
              />

              <ProjectTechnologies technologies={currentProject!.technologies} />

              <ProjectDescription description={currentProject!.description} />

              <ProjectFooter
                updatedAt={currentProject!.updatedAt}
                totalProjects={totalProjects}
                currentIndex={currentIndex}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col-reverse md:flex-col gap-4 sm:gap-8">
          <InfoCard />
          <Button
            size="lg"
            onClick={handleNextProject}
            className="w-full gap-2"
          >
            Next Project
            <span className="rounded border px-2 py-0.5 text-xs hidden md:block">Space</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
