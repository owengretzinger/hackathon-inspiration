import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  onNext: () => void;
}

export function useKeyboardNavigation({ onNext }: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle space if we're not in an input/textarea
      if (event.code === "Space" && 
          !(event.target instanceof HTMLInputElement) && 
          !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault(); // Prevent page scroll
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onNext]);
} 