import { useState, useEffect, useCallback } from "react";
import { api } from "~/trpc/react";

export function useProjects() {
  // Get total projects first
  const { data: totalProjects } = api.inspiration.getTotalProjectCount.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  // Start with a random index between 1 and totalProjects
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (!totalProjects) return 1;
    return Math.floor(Math.random() * totalProjects) + 1;
  });
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(() => new Set([currentIndex]));

  // Update currentIndex when totalProjects loads
  useEffect(() => {
    if (totalProjects) {
      const randomIndex = Math.floor(Math.random() * totalProjects) + 1;
      setCurrentIndex(randomIndex);
      setViewedIndices(new Set([randomIndex]));
    }
  }, [totalProjects]);

  const { data: currentProject, isLoading: isLoadingCurrent } = api.inspiration.getProjectByIndex.useQuery(
    { index: currentIndex },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      enabled: !!totalProjects,
    }
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && totalProjects) {
        e.preventDefault();
        const nextIndex = Math.floor(Math.random() * totalProjects) + 1;
        setCurrentIndex(nextIndex);
        setViewedIndices(prev => new Set(prev).add(nextIndex));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [totalProjects]);

  const handleNextProject = useCallback(() => {
    if (totalProjects) {
      const nextIndex = Math.floor(Math.random() * totalProjects) + 1;
      setCurrentIndex(nextIndex);
      setViewedIndices(prev => new Set(prev).add(nextIndex));
    }
  }, [totalProjects]);

  return {
    currentProject,
    isLoading: isLoadingCurrent,
    totalProjects,
    currentIndex,
    viewedProjectCount: viewedIndices.size,
    handleNextProject,
  };
} 