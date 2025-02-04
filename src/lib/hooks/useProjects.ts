import { useState, useCallback, useEffect } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

type Project = RouterOutputs["inspiration"]["getProjectByIndex"];
const BATCH_SIZE = 5; // Fetch 5 at a time to reduce API calls

export function useProjects() {
  const [projectQueue, setProjectQueue] = useState<Project[]>([]);
  const [viewedCount, setViewedCount] = useState(0);
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(new Set());

  // Get total count of projects
  const { data: totalProjects } = api.inspiration.getTotalProjectCount.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  // Start fetching next batch when only one project left
  const { data: newProjects, isLoading } =
    api.inspiration.getRandomProjects.useQuery(
      { 
        limit: BATCH_SIZE,
        exclude: Array.from(viewedIndices) 
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        enabled: projectQueue.length <= 1 && !!totalProjects,
      },
    );

  // Update queue when new projects arrive
  useEffect(() => {
    if (newProjects && projectQueue.length <= 1) {
      setProjectQueue(prev => [...prev, ...newProjects]);
    }
  }, [newProjects, projectQueue.length]);

  const handleNextProject = useCallback(() => {
    const currentProject = projectQueue[0];
    if (currentProject) {
      setViewedIndices(prev => new Set(prev).add(currentProject.index));
    }
    
    setProjectQueue((prev) => {
      const [, ...rest] = prev;
      return rest;
    });
    setViewedCount((prev) => prev + 1);
  }, [projectQueue]);

  const currentProject = projectQueue[0];
  const isInitialLoading = isLoading && projectQueue.length === 0;

  return {
    currentProject: isInitialLoading ? null : currentProject,
    isLoading: isInitialLoading,
    totalProjects,
    currentIndex: currentProject?.index ?? 0,
    viewedProjectCount: viewedCount,
    handleNextProject,
  };
}
