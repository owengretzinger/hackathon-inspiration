import { Badge } from "~/components/ui/badge";

interface ProjectTechnologiesProps {
  technologies: Array<{
    name: string;
    url?: string;
    isRecognized: boolean;
  }>;
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  return (
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
  );
} 