import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { NewsletterForm } from "~/components/newsletter-form";

interface ProjectInfoProps {
  viewedProjectCount: number;
  totalProjects: number;
  onNextProject: () => void;
}

export function ProjectInfo({
  viewedProjectCount,
  totalProjects,
  onNextProject,
}: ProjectInfoProps) {
  return (
    <Card className="h-fit">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-semibold">Current Project</h3>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>
                Viewing {viewedProjectCount} of {totalProjects} projects
              </p>
            </div>
          </div>

          <Button size="lg" onClick={onNextProject} className="w-full gap-2">
            Next Project
            <span className="rounded border px-2 py-0.5 text-xs">Space</span>
          </Button>

          <div>
            <h3 className="font-semibold">About Hackathon Inspiration</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover winning hackathon projects from Devpost. Get inspired by
              real successful projects and learn from their implementations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">How it Works</h3>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>• Winning projects are scraped from Devpost</p>
              <p>• View demo videos, source code, and live demos</p>
              <p>• Explore technologies used and team details</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Subscribe to the newsletter to get the latest winning hackathon
              projects delivered straight to your inbox! I&apos;ll also let you
              know when I add new features.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
