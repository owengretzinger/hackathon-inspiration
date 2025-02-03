import { Badge } from "~/components/ui/badge";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProjectFooterProps {
  technologies: Array<{
    name: string;
    isRecognized: boolean;
  }>;
  updatedAt: Date | string | null;
  viewedProjectCount: number;
  totalProjects: number | undefined;
}

export function ProjectFooter({
  technologies,
  updatedAt,
  viewedProjectCount,
  totalProjects,
}: ProjectFooterProps) {
  return (
    <>
      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech.name}
            variant="secondary"
            className={tech.isRecognized ? "" : "opacity-70"}
          >
            {tech.name}
          </Badge>
        ))}
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>
            Retrieved{" "}
            {updatedAt
              ? formatDistanceToNow(new Date(updatedAt), {
                  addSuffix: true,
                })
              : "unknown"}
          </span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <span>
            Project {viewedProjectCount}/
            {totalProjects?.toLocaleString() ?? "..."}
          </span>
        </div>
      </div>
    </>
  );
} 