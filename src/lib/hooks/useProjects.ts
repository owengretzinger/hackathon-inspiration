import { useState, useEffect, useCallback } from "react";
import { api } from "~/trpc/react";

export function useProjects() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [viewedProjectCount, setViewedProjectCount] = useState<number>(1);
  const [newProjectsReady, setNewProjectsReady] = useState<typeof projects>(undefined);

  const {
    data: projects,
    isLoading,
    refetch,
  } = api.inspiration.getRandomProjects.useQuery(
    { limit: 10 },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      trpc: {
        context: {
          skipBatch: true,
        },
      },
    },
  );

  const { data: totalProjects } = api.inspiration.getTotalProjectCount.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  useEffect(() => {
    if (!projects?.length) return;

    if (newProjectsReady && currentProjectIndex === projects.length - 1) {
      setCurrentProjectIndex(0);
      setNewProjectsReady(undefined);
    }
  }, [projects, currentProjectIndex, newProjectsReady]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && projects?.length) {
        e.preventDefault();
        if (currentProjectIndex === projects.length - 1) {
          void refetch().then((result) => {
            if (result.data) setNewProjectsReady(result.data);
          });
        } else {
          setCurrentProjectIndex((prev) => prev + 1);
        }
        setViewedProjectCount((count) => count + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [projects, refetch, currentProjectIndex]);

  const handleNextProject = useCallback(() => {
    if (projects?.length) {
      if (currentProjectIndex === projects.length - 1) {
        void refetch().then((result) => {
          if (result.data) setNewProjectsReady(result.data);
        });
      } else {
        setCurrentProjectIndex((prev) => prev + 1);
      }
      setViewedProjectCount((count) => count + 1);
    }
  }, [projects, refetch, currentProjectIndex]);

  const currentProject = projects?.[currentProjectIndex];

  return {
    projects,
    currentProject,
    isLoading,
    totalProjects,
    viewedProjectCount,
    handleNextProject,
  };
} 