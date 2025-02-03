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
          <Card className="h-fit">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-semibold">About Hackathon Inspiration</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A tool that helps you discover winning hackathon projects from Devpost. Get inspired by real successful projects and learn from their implementations.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">How it Works</h3>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <p>• Projects are scraped from Devpost hackathons</p>
                    <p>• Only winning projects are included</p>
                    <p>• View demo videos, source code, and live demos</p>
                    <p>• Explore technologies used and team details</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Current Project</h3>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <p>Viewing {viewedProjectCount} of {totalProjects} projects</p>
                  </div>
                </div>

                <Button size="lg" onClick={handleNextProject} className="gap-2 w-full">
                  Next Project
                  <span className="rounded border px-2 py-0.5 text-xs">Space</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
