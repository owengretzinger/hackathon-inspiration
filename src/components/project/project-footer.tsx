import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProjectFooterProps {
  updatedAt: Date | null;
  totalProjects: number;
  currentIndex: number;
}

export function ProjectFooter({
  updatedAt,
  totalProjects,
  currentIndex,
}: ProjectFooterProps) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <div>
        Project #{currentIndex} of {totalProjects}
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>
          Scraped {updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : "unknown"}
        </span>
      </div>
    </div>
  );
} 