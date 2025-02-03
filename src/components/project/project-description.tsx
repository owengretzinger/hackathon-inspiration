import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProjectDescriptionProps {
  description: string | null;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="space-y-4">
      <div
        className={`prose prose-sm max-w-none text-muted-foreground dark:prose-invert [&_a:hover]:opacity-80 [&_a]:text-primary [&_a]:underline [&_em]:italic [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mb-4 [&_strong]:text-foreground ${!isExpanded && "line-clamp-3"}`}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show More
            </>
          )}
        </div>
      </Button>
    </div>
  );
}
