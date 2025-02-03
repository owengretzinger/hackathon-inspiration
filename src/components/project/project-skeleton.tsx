import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export function ProjectSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-64" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-9 w-9 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Tagline */}
          <Skeleton className="h-5 w-3/4" />

          {/* Awards */}
          <div className="flex flex-wrap gap-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-6 w-32" />
            ))}
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Gallery */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="col-span-2 aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
        </div>

        {/* Description */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <Skeleton className="h-9 w-full" />
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-6 w-24" />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
} 